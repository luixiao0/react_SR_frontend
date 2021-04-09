import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import { List, Space, Button, PageHeader} from 'antd';
import {CompressOutlined, PictureOutlined, ArrowsAltOutlined } from '@ant-design/icons';
import { DownloadOutlined} from '@ant-design/icons'



class Tasks extends React.Component {

  render() {  
    const listData = [];

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
        title={this.props.name}
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
            <IconText icon={ArrowsAltOutlined} text={item.scale} key="list-vertical-star-o" />,
            <IconText icon={PictureOutlined} text={item.noiselevel} key="list-vertical-like-o" />,
            <IconText icon={CompressOutlined} text={item.width} key="list-vertical-message" />,
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

export default Tasks