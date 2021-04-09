import React from 'react'
import { Layout} from 'antd';
import CustomMenu from './PicButton'
import {Route, Switch} from 'react-router-dom'
import DoubleRowTask from './pages/DoubleRowTask'
import LoginMain from './pages/login'
const { Header, Content, Footer, Sider } = Layout;

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
    
        
        <Layout>
          <Content style={{ margin: '24px 16px 0' }}>
              <Switch>
					<Route exact path='/login'><LoginMain/></Route>
					<Route exact path='/tasks'><DoubleRowTask/></Route>
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
