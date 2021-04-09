import React from "react"
import ReactDOM from "react-dom"
import { makeAutoObservable } from "mobx"
import { observer } from "mobx-react"

export default class Userstate {
    Auth = {}
    Tasks = {}
    userinfo = {
        username:"",
        password:""
    }
    constructor() {
        makeAutoObservable(this)
    }

    auth_header(Authorization){
        return Authorization.token_type + ' ' + Authorization.access_token
    }

    get_token(){
        fetch('http://127.0.0.1:8000/token',{
            method:"post",
            headers:{
              "Accept": "application/json",
              "Content-Type":"application/x-www-form-urlencoded"
              },
              body:'username='+this.state.username+'&password='+ this.state.password
              }
            ).catch(error => console.log(error))
            .then(res=>res.json()).then(data=>{
                  this.Authorization = data

            }) 
            console.log(this.Authorization)
    }
    set_state_uname(uname){
        this.userinfo.username = uname
    }
    set_state_psw(psw){
        this.userinfo.password = psw
    }
    
}

// const TimerView = observer(({ Userstate }) => (
//     <button onClick={() => Userstate.get_token()}>{Userstate.Auth}</button>
// ))