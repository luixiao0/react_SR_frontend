import React from 'react'

function auth_header(Authorization){
    return Authorization.token_type + ' ' + Authorization.access_token
}

var Authorization = {}
const token = (uname, psw)=>{
    fetch('/token',{
        method:"post",
        headers:{
            "accept": "application/json",
            "Content-Type":"application/x-www-form-urlencoded"},
        body:'username='+uname+'&password='+psw
    }).then(res=>res.json()).then(data=>{
                 Authorization = data
    })
}


function Login() {
    return (
        <div>
            username:<input className='username'/>
            password:<input className='psw'/>
            <button onClick></button>
        </div>
    )
}

export default Login
