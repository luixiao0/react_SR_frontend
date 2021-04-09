import React from 'react'
import {Button} from 'antd';
import { UserOutlined ,LockOutlined} from '@ant-design/icons';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';

import { Input, Space } from 'antd';
var Authorization = {}

function auth_header(Authorization){
    return Authorization.token_type + ' ' + Authorization.access_token
}



class Login extends React.Component{
  state={
    username:"",
    password:""
  }
  onTextchange_uname = (event) =>{
    this.setState({ username: event.target.value });
  }
  onTextchange_psw = (event) =>{
    this.setState({ password: event.target.value });
  }

  token = ()=>{
    fetch('http://127.0.0.1:8000/token',{
      mode: 'cors',
      method:"post",
      headers:{
      "Accept": "application/json",
      "Content-Type":"application/x-www-form-urlencoded"
      },
      body:'username='+this.state.username+'&password='+ this.state.password
      }
    ).catch(error => console.log(error))
    .then(res=>res.json()).then(data=>{
          Authorization = data
    }) 
    console.log(Authorization)
  }

  render() {
    return (
      <>
      <Space direction="horizontal">
      <Input
        placeholder="username"
        prefix={<UserOutlined/>}
        onChange={this.onTextchange_uname}
        value={this.state.username}
      />
      <Input.Password
        placeholder="password"
        prefix ={<LockOutlined/>}
        iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
        onChange={this.onTextchange_psw}
        value={this.state.password}
        onPressEnter={this.token}
      />
      
      <Button onClick={this.token}>Login</Button>
    </Space>
    </>
    );
  }
}



// function Login() {
//   return (
//     <div>
//       <Space direction="vertical">
//         <Input
//           placeholder="username"
//           prefix={<UserOutlined/>}
//           onChange={this.onTextchange_uname}
//         />
//         <Input.Password
//           placeholder="   password"
//           prefix ={<LockOutlined/>}
//           iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
//           onChange={this.onTextchange_psw}
//         />
//         <Button onClick={}>Login</Button>
//       </Space>
//     </div>
//   )
// }

export default Login
