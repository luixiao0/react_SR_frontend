import React from "react"
import ReactDOM from "react-dom"
import { makeAutoObservable } from "mobx"
import { observer } from "mobx-react"

export default class Userstate {
    Auth = ""
    TasksList = []
    regState = false
    logState = false
    notAuth = false
    state = {
        username:"",
        password:""
    }
    constructor() {
        makeAutoObservable(this)
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
                    this.logState = true
                    this.Auth = data.access_token}
            }) 
    }
    display = () =>{
        console.log(this.Auth)
    }

    get_tasks = () => {
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
                this.TasksList = []
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
                            this.TasksList.push(curtask)
                        })
                    }
                }}
                else{
                    // notauth
                    this.notAuth = true
                }
            })
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