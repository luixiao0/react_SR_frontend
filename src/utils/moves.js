reg = (username, password)=>{
    fetch('/reg',{
        method:"post",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({
               uname:username,
               psw:password,
            }) 
    }).then(res=>res.json()).then(data=>{
                 response = data
    })
}

token = (uname, psw)=>{
    fetch('/token',{
        method:"post",
        headers:{
            "accept": "application/json",
            "Content-Type":"application/x-www-form-urlencoded"},
        body:'username='+uname+'&password='+psw
    }).then(res=>res.json()).then(data=>{
                 response = data
    })
}