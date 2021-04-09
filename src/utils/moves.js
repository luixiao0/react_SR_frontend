import React from "react"
import ReactDOM from "react-dom"
import { makeAutoObservable } from "mobx"
import { observer } from "mobx-react"

export default class Userstate {
    Auth = ""
    Tasks = {
    }
    regState = ""
    state = {
        username:"",
        password:""
    }
    
    constructor() {
        makeAutoObservable(this)
    }

    auth_header(Authorization){
        return Authorization.token_type + ' ' + Authorization.access_token
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
              this.regState = data
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
                  this.Auth = data.access_token
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
              "Accept": "application/json",
              "Authorization": tokenHeader
              },
            body:""
            }).catch(error => console.log(error))
            .then(res=>res.json()).then(data=>{
                  this.Tasks = data
                  console.log(data)
        }) 
    }
    
    output_tasks = () => {
        JSON.stringify(this.Tasks)
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