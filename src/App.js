<<<<<<< Updated upstream
import './App.css';
import React from 'react';
import Framebars from './utils/sidebar'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import Firstpage from './pages/firstpage'
import Tasks from './pages/tasks'
import Stat from './pages/stat'
import Luixiao from './pages/lux'
import Login from './pages/login'


function App() {
  return (
    <div className='App'>
    <Router>
    
      <Framebars/>
      <Switch>
        <Route path='/' exact component={Login}/>
        <Route path='/tasks' component={Tasks}/>
        <Route path='/me' component={Stat}/>
        <Route path='/lux' component={Luixiao}/>
      </Switch>
    </Router>
    </div>
  );
=======
import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import './index.css';
import { List, Avatar, Space, Button} from 'antd';
import {CompressOutlined, PictureOutlined, ArrowsAltOutlined } from '@ant-design/icons';
import PicButton from './PicButton'

import { DownloadOutlined} from '@ant-design/icons'

class App extends React.Component {

  render() {  
    const listData = [];
    

    // gendata
    for (let i = 0; i < 23; i++) {
      listData.push({
        imgfin: 'https://ant.design',
        preview:'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1348006748,506309393&fm=26&gp=0.jpg',
        taskid: i,
        state: i%3,
        title: `ant design part ${i}`,
        description:
          'Ant Design, a design language for background applications, is refined by Ant UED Team.',
      });
    }
    // gendata

    const IconText = ({ icon, text }) => (
      <Space>
        {React.createElement(icon)}
        {text}
      </Space>
    );

    return (
      <List
      itemLayout="vertical"
      size="large"
      pagination={{
        onChange: page => {
          console.log(page);
        },
        pageSize: 10,
      }}
      dataSource={listData}
      footer={
        <div>
          <b>ant design</b> footer part
        </div>
      }
      renderItem={item => (
        <List.Item
          key={item.taskid}
          actions={[
            <IconText icon={ArrowsAltOutlined} text="156" key="list-vertical-star-o" />,
            <IconText icon={PictureOutlined} text="156" key="list-vertical-like-o" />,
            <IconText icon={CompressOutlined} text="2" key="list-vertical-message" />,
          ]}
          extra={<img
              width={200}
              alt="logo"
              src={item.preview}
            />}
        >
          <List.Item.Meta
            // avatar={<Avatar src={item.avatar} />}
            title={<a href={item.href}>{item.title}</a>}
            description={item.description}
          />
          
          {/* {item.content} */}

          <div>
          <Button type="primary" shape="round" icon={<DownloadOutlined />} disabled={item.state===1? true:false} loading={item.state===2? true:false} size='large'>Download</Button>
          </div>

        </List.Item>
      )}
    />
    );
  }
>>>>>>> Stashed changes
}

export default App