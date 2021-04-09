import React from 'react'
import {Button} from 'antd';
import { UserOutlined ,LockOutlined} from '@ant-design/icons';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { Input, Space } from 'antd';
import Userstate from '../utils/moves'
import { observer } from "mobx-react"

global.CurrentUser = new Userstate()


// Build a "user interface" that uses the observable state.
const Loginob = observer(({ user }) => (
  <>
    <Input
        placeholder="username"
        prefix={<UserOutlined/>}
        onChange={user.set_state_uname}
        value={user.state.username}
    />
    <Input.Password
      placeholder="password"
      iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
      prefix={<UserOutlined/>}
      onChange={user.set_state_psw}
      value={user.state.password}
    />
    <Button onClick={user.get_token} type="primary">Login</Button>
    <Button onClick={user.reg} type="primary">Register {user.regState}</Button>
    <Button onClick={user.display} type="primary">token:{user.Auth}</Button>
    <Button onClick={user.get_tasks} type="primary">HERE!{JSON.stringify(user.output_tasks)}</Button>
  </>
))

function Login() {
  return (
    <>
      <Space direction="horizontal">
        <Loginob user={global.CurrentUser}/>
        {/* <Button onClick={getAUth}>GET</Button> */}
    </Space>
    </>
  );
}
export default Login