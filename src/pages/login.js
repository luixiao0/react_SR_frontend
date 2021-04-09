import React from 'react'
import {Button} from 'antd';
import { UserOutlined ,LockOutlined} from '@ant-design/icons';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { Input, Space } from 'antd';
import Userstate from '../utils/moves'
import { observer } from "mobx-react"
const CurrentUser = new Userstate()

function Login() {
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
export default Login

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
