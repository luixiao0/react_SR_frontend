import React from 'react'
import { Layout} from 'antd';
import CustomMenu from './PicButton'
import {Route, Switch} from 'react-router-dom'
import Tasks from './pages/Tasks.js'
import LoginMain from './pages/login'
import './App.css'
import './pages/minh.css'
import Userstate from './utils/moves'
import FirstPage from './pages/FirstPage'
import Uploadpage from './pages/upload'
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
} from '@ant-design/icons';
const { Header, Content, Footer, Sider } = Layout;

global.CurrentUser = new Userstate()

class App extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      collapsed: true,
    };
  }

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };
  render(){
  return (
  <Layout>
    
    <LoginMain/>
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
        collapsible
        collapsed={this.state.collapsed}
        onBreakpoint={broken => {
          this.toggle()
        }}
        trigger={null}
        onCollapse={(collapsed, type) => {
          console.log(collapsed, type);
        }}
      >
        <div className="logo" />
        
        <CustomMenu/>
      </Sider>
  
      
      <Layout className='content'>
        <Header className="site-layout-background" style={{ padding: 0 }}>
          {React.createElement(this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
            className: 'trigger',
            onClick: this.toggle,
          })}
        </Header>
        {/* <div id="bg" className="bg">sada</div> */}

        <Content style={{ margin: '24px 16px 0' }}>
        
        
        <Switch>
          <Route exact path='/'><FirstPage/></Route>
          {/* <Route exact path='/tasks'><DoubleRowTask className='content'/></Route> */}
          <Route exact path='/tasks'><Tasks name='tasks'/></Route>
          
          <Route exact path='/upload'><Uploadpage/></Route>
          {/* <Route exact path='/logout'><FirstPage className='content' logout/></Route> */}
          
          {/* <Route exact path='/me' component={global.me}/>
          <Route exact path='/help' component={global.help}/> */}
        </Switch>
      </Content>
        <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
      </Layout>
      
  </Layout>
  )
  }
}

export default App


