import React from 'react'
import { Layout} from 'antd';
import CustomMenu from './PicButton'
import {Route, Switch} from 'react-router-dom'
import DoubleRowTask from './pages/DoubleRowTask'
import LoginMain from './pages/login'
import './App.css'
import Userstate from './utils/moves'
import FirstPage from './pages/FirstPage'
import Uploadpage from './pages/upload'
const { Header, Content, Footer, Sider } = Layout;


global.CurrentUser = new Userstate()



function App() {

    
    return (
    <Layout>
        <Sider
          breakpoint="lg"
          collapsedWidth="0"
          onBreakpoint={broken => {
            console.log(broken);
          }}
          onCollapse={(collapsed, type) => {
            console.log(collapsed, type);
          }}
        >
          <div className="logo" />
          
          <CustomMenu/>
        </Sider>
    
        
        <Layout className='app'>
          
          <LoginMain/>
          
          {/* <div id="bg" class="bg">sada</div> */}

          <Content style={{ margin: '24px 16px 0' }}>
          
          
          <Switch>
            <Route exact path='/'><FirstPage className='content'/></Route>
            <Route exact path='/tasks'><DoubleRowTask className='content'/></Route>
            <Route exact path='/upload'><Uploadpage className='content'/></Route>
            
            <Route exact path='/logout'><FirstPage className='content' logout/></Route>
            
            {/* <Route exact path='/me' component={global.me}/>
            <Route exact path='/help' component={global.help}/> */}
				  </Switch>
        </Content>
          <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
        </Layout>
        
    </Layout>
    )
}

export default App
