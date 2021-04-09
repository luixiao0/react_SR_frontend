import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Row, Col } from 'antd'
import './index.css';
import { Layout, Menu } from 'antd';
import { UploadOutlined, UserOutlined, VideoCameraOutlined } from '@ant-design/icons';


const { Header, Content, Footer, Sider } = Layout;

ReactDOM.render(
  <React.StrictMode>
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
      <Menu theme="dark" mode="inline" defaultSelectedKeys={['4']}>
        <Menu.Item key="1" icon={<UserOutlined />}>
          login
        </Menu.Item>
        <Menu.Item key="2" icon={<VideoCameraOutlined />}>
          tasks
        </Menu.Item>
        <Menu.Item key="3" icon={<UploadOutlined />}>
          upload
        </Menu.Item>
        <Menu.Item key="4" icon={<UserOutlined />}>
          me
        </Menu.Item>
      </Menu>

    </Sider>

    
    <Layout>
      {/* <Header className="site-layout-sub-header-background" style={{ padding: 0 }} /> */}
      <Content style={{ margin: '24px 16px 0' }}>

        <div>
          <Row className='row'>
            <Col flex={1}><App name='finished'/></Col>
            <Col flex={1}><App name='unfinished'/></Col>
          </Row>
        </div>

      </Content>
      <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
    </Layout>
  </Layout>
  </React.StrictMode>,
  document.getElementById('root')
);

