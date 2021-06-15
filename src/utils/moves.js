import { makeAutoObservable, runInAction } from "mobx"
import config from './config.json'

export default class Userstate {
    Auth = ""
    TasksList = []
    TasksListfin = []
    regState = false
    logState = 0
    notAuth = true
    state = {
        username:"",
        password:""
    }

    constructor() {
        makeAutoObservable(this)
        this.Auth = localStorage.Auth
        this.logState = Number(localStorage.logState)
        console.log(config)
        this.backend = config.backend_address
        
        this.previewhref = this.backend + "/preview/"
        this.dloadhref = this.backend + "/me/dload?taskid="
        this.delhref = this.backend + "/deltask?taskid="
    }

    reg = () => {
        fetch(this.backend + "/reg",{
            method:"post",
            headers:{
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body:JSON.stringify(this.state)
        }).catch(error => console.log(error))
        .then(res=>res.json()).then(data=>{
            if (data === 'success')
              this.regState = true
        })
    }
    tokenHeader = () =>{return 'Bearer ' + this.Auth}

    get_token = () => {
        const tokenbody='username='+this.state.username+'&password='+ this.state.password
        console.log(this.backend)
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
                    this.logState = 1
                    localStorage.logState = 1
                    // var login=document.getElementById('logger_div');
                    // var bg=document.getElementById('bg');
                    // login.style.display="none";
                    // bg.style.display="none";
                    this.Auth = data.access_token
                    localStorage.Auth = data.access_token
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

    dloadtask = (taskid) => {
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
                filename = filename.match(/\"(.*)\"/)[1]; //提取文件名
                a.href = url;
                a.download = filename; //给下载下来的文件起个名字
                a.click();
                window.URL.revokeObjectURL(url);
                a = null;
            }
        }))
    }

    get_tasks = () => {
        runInAction(() => {
        this.TasksList = []
        this.TasksListfin = []})
        fetch(this.backend +"/me/query",{
            method:"post",
            headers:{
              "accept": "application/json",
              "Authorization": this.tokenHeader()
            },
            body:""
            })
            .then(res=>res.json()).then(data=>{
                if (!data.detail){
                    for (var key in data){
                        const curtask = data[key]
                        if (curtask === null){
                            continue
                        }
                        // const dest = 'http://127.0.0.1:8000/preview/' + curtask.taskid
                        // fetch(dest,{
                        //     method:"get",
                        //     headers:{
                        //         "accept": "application/json",
                        //         "Authorization": tokenHeader
                        //     },
                        // }).catch(error => console.log(error))
                        // .then(response => response.blob())
                        // .then(images => {
                        //     // Then create a local URL for that image and print it 
                        //     if (images){
                        //         curtask.preview = URL.createObjectURL(images)
                        //     }
                            // console.log(curtask)
                        //     
                        // })
                        if(curtask.state!==1){
                            runInAction(() => {
                                this.TasksList.push(curtask)
                            })
                        }
                        else{
                            runInAction(() => {
                            this.TasksListfin.push(curtask)
                            })
                        }
                    }
                }
            }
        ).catch(error => console.log(error))
    }

    newTask = (tasks, SRvar) => {
        let formData = new FormData()
        console.log(formData)
        tasks.forEach(file => {
            if(['image/jpeg', 'image/gif', 'image/png', 'image/svg+xml'].includes(file.type)) {
                formData.append("files", file); 
            }
        });
        console.log(formData)
        const SRspell = "?noise=" + SRvar.noiselevel + "&sf=" + SRvar.scale + "&width=" + SRvar.kernel_width
        const newTaskspell = this.backend + "/me/newtask/" + SRspell
        console.log(newTaskspell)
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
        this.TasksList = []
        this.TasksListfin = []
        this.regState = false
        this.logState = 0
        this.notAuth = true
        localStorage.clear();

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
