import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Layout } from 'antd';
import { Row, Col } from 'antd';
import { Divider } from 'antd';
const { Header, Footer, Content } = Layout;

ReactDOM.render(
  <React.StrictMode>
    <Header>header</Header>
      <Layout>
        <Content className='mainpage'>
          <div>
          <Row className='row'>
            <Col flex={5}><App/></Col>
            <Col flex={5}><App/></Col>
          </Row>
          </div>
        </Content>
      </Layout>
      
      <Footer>footer</Footer>
  </React.StrictMode>,
  document.getElementById('root')
);

