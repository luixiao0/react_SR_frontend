import React from 'react'
import {Button} from 'antd';
import { UserOutlined} from '@ant-design/icons';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { Input } from 'antd';
import './login.css'

// import Userstate from '../utils/moves'
// global.CurrentUser = new Userstate()

// Build a "user interface" that uses the observable state.

class LoginMain extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      uname:localStorage.uname,
      psw:localStorage.psw,
      logState:false,
      regState:false
    }
    this.handleLogin()
  }
  // componentDidMount(){
  //   setInterval(global.CurrentUser.get_token, 10*60*1000)
  // }
  handleChange = e => {
    const {name, value} = e.target;
    this.setState(() => ({
      [name]: value
    }))
  }
  setter = (p, state) =>{
    this.setState(() => ({
      [p]:state,
    }))
    if(state){
      setInterval(this.handleLogin,1000*60*10)
    }
  }

  handleLogin = () => {
    global.CurrentUser.get_token(this.setter, this.state)

  }

  handleReg = () =>{
    global.CurrentUser.reg(this.setter, this.state)
  }

  componentWillUnmount(){
    alert("umount login")
  }
  

  render(){
    const user = global.CurrentUser
    return (
    <div id="login" className={this.state.logState? "hide bg":"bg"}>
    <div className={this.state.logState? "hide logger_div":"logger_div"}>
      <Input
          placeholder="username"
          prefix={<UserOutlined/>}
          onChange={this.handleChange}
          value={this.state.uname}
          name="uname"
          className = 'login_input'
      />
      <Input.Password
        placeholder="password"
        iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
        prefix={<UserOutlined/>}
        onChange={this.handleChange}
        value={this.state.psw}
        name="psw"
        className = 'login_input'
      />
      <div className='buttons'>
      <Button onClick={this.handleLogin} type="primary" disabled={this.state.logState? true:false}>{user.state.logState? "Success":"Login"}</Button>
      <Button onClick={this.handleReg} disabled={this.state.regState? true:false}>{this.state.regState? "Success": "Register"}</Button>
      </div>
    </div>
    {/* <div id="bg" class={user.state.logState|!user.state.notAuth? "hidden":"bg"}>sada</div> */}
    </div>
    );
  }
}
export default LoginMain