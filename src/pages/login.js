import React from 'react'
import {Button} from 'antd';
import { UserOutlined ,LockOutlined} from '@ant-design/icons';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { Input, Space } from 'antd';
import Userstate from '../utils/moves'
import { observer } from "mobx-react"
import './login.css'

global.CurrentUser = new Userstate()


// Build a "user interface" that uses the observable state.
const Loginob = observer(({ user }) => (
  <div className="logger_div">
    <Input
        placeholder="username"
        prefix={<UserOutlined/>}
        onChange={user.set_state_uname}
        value={user.state.username}
        className = 'login_input'
    />
    <Input.Password
      placeholder="password"
      iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
      prefix={<UserOutlined/>}
      onChange={user.set_state_psw}
      value={user.state.password}
      className = 'login_input'
    />
    <div className='buttons'>
    <Button onClick={user.get_token} type="primary" disabled={user.logState? true:false}>Login{user.logState? " success":""}</Button>
    <Button onClick={user.reg} disabled={user.regState? true:false}>Register{user.regState? " success": ""}</Button>
    {/* <Button onClick={user.display} type="primary">token:{user.Auth}</Button> */}
    {/* <Button onClick={user.get_pic} type="primary">HERE!</Button> */}
    </div>
  </div>
))

function Login() {
  return (
    <>
      <Space direction="vertical" className="logger">

        <Loginob user={global.CurrentUser}/>
    </Space>
    </>
  );
}
export default Login