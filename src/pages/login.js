import React from 'react'
import {Button} from 'antd';
import { UserOutlined} from '@ant-design/icons';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { Input } from 'antd';
import './login.css'

// import Userstate from '../utils/moves'
// global.CurrentUser = new Userstate()

// Build a "user interface" that uses the observable state.

const Loginob = (props) => {
  const {id,classname,user} = props
  return (
  <div className={user.logState|!user.notAuth? "hidden":"bg"}>
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
    <Button onClick={user.get_token} type="primary" disabled={user.state.logState? true:false}>{user.state.logState? "Success":"Login"}</Button>
    <Button onClick={user.reg} disabled={user.state.regState? true:false}>{user.state.regState? "Success": "Register"}</Button>
    </div>
  </div>
  {/* <div id="bg" class={user.state.logState|!user.state.notAuth? "hidden":"bg"}>sada</div> */}
  </div>
  )
}

class LoginMain extends React.Component{
  componentDidMount(){
    setInterval(global.CurrentUser.get_token, 10*60*1000)
  }
  render(){
    return (
      <Loginob id="login" className="login" user={global.CurrentUser}/>
    );
  }
}
export default LoginMain