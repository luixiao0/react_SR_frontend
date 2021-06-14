import React from 'react'
import {Button} from 'antd';
import { UserOutlined} from '@ant-design/icons';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { Input } from 'antd';
import { observer } from "mobx-react"
import './login.css'


// Build a "user interface" that uses the observable state.

const Loginob = observer(({ user }) => (
  <>
  <div className={user.logState|!user.notAuth? "hidden":"logger_div"}>
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
    <Button onClick={user.get_token} type="primary" disabled={user.logState? true:false}>{user.logState? "Success":"Login"}</Button>
    <Button onClick={user.reg} disabled={user.regState? true:false}>{user.regState? "Success": "Register"}</Button>
    {/* <Button onClick={user.display} type="primary">token:{user.Auth}</Button> */}
    {/* <Button onClick={user.get_pic} type="primary">HERE!</Button> */}
    </div>
  </div>
  <div id="bg" class={user.logState|!user.notAuth? "hidden":"bg"}>sada</div>
  </>
))

function Login() {
  // if (!global.CurrentUser.logState){
  //   console.log('in')
    return (
      <Loginob id="login" className="login" user={global.CurrentUser}/>
    );
  // }
  // else{
  //   <div>
  //     <Loginob user={global.CurrentUser}/>
  //     <div id="bg" class="bg hid">sada</div>
  //   </div>
  // }
}
export default Login