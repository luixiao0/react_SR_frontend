import { makeAutoObservable } from "mobx"

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

        
    }

    reg = () => {
        fetch('http://127.0.0.1:8000/reg',{
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

    get_token = () => {
        const tokenbody='username='+this.state.username+'&password='+ this.state.password
        console.log(tokenbody)
        // console.log(testbody)
        fetch('http://127.0.0.1:8000/token',{
            method:"post",
            headers:{
              "Accept": "application/json",
              "Content-Type":"application/x-www-form-urlencoded"
              },
              body:tokenbody
              }
            ).catch(error => console.log(error))
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

            }) 
    }
    display = () =>{
        console.log(this.Auth)
    }

    get_tasks = () => {
        this.TasksList = new Array()
        this.TasksListfin = new Array()
        const tokenHeader = 'Bearer ' + this.Auth
        fetch('http://127.0.0.1:8000/me/query',{
            method:"post",
            headers:{
              "accept": "application/json",
              "Authorization": tokenHeader
              },
            body:""
            }).catch(error => console.log(error))
            .then(res=>res.json()).then(data=>{
                if (!data.detail){
                for (var key in data){
                    var curtask = data[key]
                    if (curtask){
                        const dest = 'http://127.0.0.1:8000/preview/' + curtask.taskid
                        fetch(dest,{
                            method:"get",
                            headers:{
                                "accept": "application/json",
                                "Authorization": tokenHeader
                            },
                        }).catch(error => console.log(error))
                        .then(response => response.blob())
                        .then(images => {
                            // Then create a local URL for that image and print it 
                            if (images){
                                curtask.preview = URL.createObjectURL(images)
                                console.log(curtask)
                            }
                            
                            if(curtask.state!==1){
                                this.TasksList.push(curtask)
                            }
                            else{
                                this.TasksListfin.push(curtask)
                            }
                        })
                    }
                }}
                else{
                    // notauth
                    this.notAuth = true
                    this.Auth = ""
                    this.logState = 0
                }
            })
    }

    logout = () => {
        
        this.Auth = ""
        this.TasksList = []
        this.TasksListfin = []
        this.regState = false
        this.logState = 0
        this.notAuth = true
        localStorage.clear(); // 移除所有

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

// const TimerView = observer(({ Userstate }) => (
//     <button onClick={() => Userstate.get_token()}>{Userstate.Auth}</button>
// ))