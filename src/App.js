import React from 'react'
import { Layout} from 'antd';
// import CustomMenu from './PicButton'
import './App.css'
import './pages/minh.css'
import Userstate from './utils/moves'
import Uploadpage from './pages/upload'
const { Header, Content, Footer } = Layout;

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
    
      {/* <Sider
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
      </Sider> */}
      
      <Layout className='content'>
        {/* <Header className="site-layout-background" style={{ padding: 0 }}>
          {React.createElement(this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
            className: 'trigger',
            onClick: this.toggle,
          })}
        </Header> */}
        <Header></Header>
        {/* <div id="bg" className="bg">sada</div> */}

        <Content style={{ margin: '24px 16px 0' }}>
          <Uploadpage/>
          {/* <Switch>
            <Route exact path='/'><FirstPage/></Route>
            <Route exact path='/tasks'><Tasks name='tasks'/></Route>
            <Route exact path='/upload'><Uploadpage/></Route>
          </Switch> */}
        </Content>
        <Footer style={{ textAlign: 'center' }}>Lux Attempt Proj</Footer>
      </Layout>
      
  </Layout>
  )
  }
}

export default App


