import config from './config.json'

export default class Userstate {
  Auth = ""
  constructor() {
      this.Auth = localStorage.Auth
      this.logState = Number(localStorage.logState)
      console.log(config)
      this.backend = config.backend_address
      
      this.previewhref = this.backend + "/preview/"
      this.dloadhref = this.backend + "/me/dload?taskid="
      this.delhref = this.backend + "/deltask?taskid="

      this.state = {
        username:"",
        password:""
      }
  }

  reg = (setter, state) => {
      fetch(this.backend + "/reg",{
          method:"post",
          headers:{
              "Accept": "application/json",
              "Content-Type": "application/json"
          },
          body:JSON.stringify(state)
      }).catch(error => console.log(error))
      .then(res=>res.json()).then(data=>{
          if (data === "success")
          setter("regState", true)
      })
  }
  tokenHeader = () =>{return 'Bearer ' + this.Auth}

  get_token = (setter, state) => {
    console.log(state)
    const tokenbody='username=' + state.uname+'&password=' + state.psw
    console.log("token fetch")
    fetch(this.backend +"/token",{
      method:"post",
      headers:{
        "Accept": "application/json",
        "Content-Type":"application/x-www-form-urlencoded"
        },
        body:tokenbody
      }
    )
    .then(res=>res.json()).then(data=>{
      if (data.access_token){
        localStorage.logState = 1
        // var login=document.getElementById('logger_div');
        // var bg=document.getElementById('bg');
        // login.style.display="none";
        // bg.style.display="none";
        this.Auth = data.access_token
        localStorage.Auth = data.access_token
        setter("logState", true)
      }
    }).catch(error => console.log(error)) 
  }

  deltask = (taskid) => {
      console.log(taskid)
      fetch(this.delhref + taskid,{
          method:"post",
          headers:{
            "accept": "application/json",
            "Authorization": this.tokenHeader()
          },
          body: ""
      }).then(res=>{
          console.log(res)
      })
  }

  DLtask = (taskid) => {
      console.log(taskid)
      fetch(this.dloadhref + taskid,{
          method:"get",
          headers:{
            "accept": "application/json",
            "Authorization": this.tokenHeader()
          }
      }).then(res => res.blob().then(blob => {
          let a = document.createElement('a');
          let url = window.URL.createObjectURL(blob);
          let filename = res.headers.get('content-disposition');
          console.log(res.headers.forEach((e)=>{console.log(e)}))
          if (filename) {
              filename = filename.match(/"(.*)"/)[1]; //提取文件名
              a.href = url;
              a.download = filename; //给下载下来的文件起个名字
              a.click();
              window.URL.revokeObjectURL(url);
              a = null;
          }
      }))
  }

  get_tasks = (page, setter) => {
    fetch(this.backend +"/me/query/"+String(page),{
    // fetch(this.backend +"/me/query/1",{
      method:"post",
      headers:{
        "accept": "application/json",
        "Authorization": this.tokenHeader()
      },
      body:""
      })
    .then(res=>{
      if(res.ok){
        return res.json()
      }
    })
    .then(res=>{
      let TasksList = []
      if (!res.detail){
        res.forEach((value, index)=>{
          const curtask = value
          if (curtask !== null){
            TasksList.push(curtask)
          }
        })
      }
      setter(page, TasksList)
    })
    .catch(error => console.log(error))
  }

  get_preview = (taskid, setter) => {
    fetch(this.previewhref+taskid,{
      method:"get",
      headers:{
        "accept": "application/json",
        "Authorization": this.tokenHeader()
      }
    }).then((response)=>{
      return response.blob();
    }).then((myBlob) => {
      let objectURL = URL.createObjectURL(myBlob);
      console.log(objectURL)
      setter(objectURL);
    });
  }

  newTask = (tasks, SRvar) => {
      let formData = new FormData()
      console.log(formData)
      tasks.forEach(file => {
          if(['image/jpeg', 'image/gif', 'image/png', 'image/svg+xml'].includes(file.type)) {
              formData.append("files", file); 
          }
      });
      // console.log(formData)
      const SRspell = "?noise=" + SRvar.noiselevel + "&sf=" + SRvar.scale + "&width=" + SRvar.kernel_width
      const newTaskspell = this.backend + "/me/newtask/" + SRspell
      // console.log(newTaskspell)
      fetch(newTaskspell,{
          method:"POST",
          headers:{
            "accept": "application/json",
            "Authorization": this.tokenHeader(),
          //   "Content-Type": "multipart/form-data"
          },
          body:formData
          })
          .then(response => response.json())
          .then(data => {
            console.log(data)
          })
          .catch(error => {
            console.error(error)
          })
  }

  logout = () => {
      this.Auth = ""
      this.state = {
        username:"",
        password:""
      }
      localStorage.clear();
      // window.location.reload()
      // var login=document.getElementById('logger_div');
      // var bg=document.getElementById('bg');
      // login.style.display="block";
      // bg.style.display="block";
  }

  set_state_uname = (event) =>{
      this.state.username = event.target.value
  }
  set_state_psw = (event) =>{
      this.state.password = event.target.value
  }
    
}
