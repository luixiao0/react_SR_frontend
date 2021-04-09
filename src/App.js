import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import './index.css';
import { List, Space, Button, PageHeader} from 'antd';
import {CompressOutlined, PictureOutlined, ArrowsAltOutlined } from '@ant-design/icons';
import GetTasks from './data'

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
      <>
      <PageHeader
        className="site-page-header"
        title="Title"
        backIcon={false}
        subTitle="This is a subtitle"
        extra={[
        <Button key="3">Operation</Button>,
        <Button key="2">Operation</Button>,
        <Button key="1" type="primary">Primary</Button>,
        ]}
        
      />
      <List
      itemLayout="vertical"
      size="large"
      bordered
      pagination={{
        onChange: page => {
          console.log(page);
        },
        pageSize: 30,
      }}
      dataSource={listData}
      renderItem={item => (
        <List.Item
          key={item.taskid}
          actions={[
            <IconText icon={ArrowsAltOutlined} text="156" key="list-vertical-star-o" />,
            <IconText icon={PictureOutlined} text="156" key="list-vertical-like-o" />,
            <IconText icon={CompressOutlined} text="2" key="list-vertical-message" />,
          ]}
          extra={<img
              height={150}
              alt="logo"
              src={item.preview}
            />}>
          <List.Item.Meta
            title={<a href={item.href}>{item.title}</a>}
            description={item.description}
          />

          <div>
          <Button type="primary" shape="round" icon={<DownloadOutlined />} disabled={item.state===1? true:false} loading={item.state===2? true:false} size='large'>Download</Button>
          </div>

        </List.Item>
      )}
      />
      </>
    );
  }
}

export default App