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
                 Authorization = data
    })
}

auth_header = function(){
    return Authorization.token_type + ' ' + Authorization.access_token
} 

my_status = () =>{
    fetch('/me',{
        headers:{
            "accept": "application/json",
            "Authorization": auth_header()
        }}).then(res=>res.json()).then(data=>{
            status = data
        })
}

task_query = () =>{
    fetch('/me/query',{
        method:"post",
        headers:{
            "accept": "application/json",
            "Authorization": auth_header()
        },
        }).then(res=>res.text()).then(data=>{
            curtasks = JSON.parse(data);
        })
}




new_task = (file) =>{
    fetch('/me/newtask',{
        headers:{
            method:"post",
            "accept": "application/json",
            "Authorization": auth_header(),
            'Content-Type': 'multipart/form-data'
            },
            body: file
        }).then(
            response => response.json() // if the response is a JSON object
          ).then(
            success => console.log(success) // Handle the success response object
          ).catch(
            error => console.log(error) // Handle the error response object
          );
}


