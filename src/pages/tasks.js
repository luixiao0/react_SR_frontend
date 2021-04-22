import React from 'react';
import 'antd/dist/antd.css';
import { List, Space, Button, PageHeader } from 'antd';
import {CompressOutlined, PictureOutlined, ArrowsAltOutlined } from '@ant-design/icons';
import { DownloadOutlined} from '@ant-design/icons'
import { observer } from "mobx-react"
import {toJS} from "mobx"

const IconText = ({ icon, text }) => (
  <Space>
    {React.createElement(icon)}
    {text}
  </Space>
);

const Taskob = observer(({user, fin}) => (
  <>
    {/* <Button onClick={user.get_tasks}>GET</Button> */}
    {/* {JSON.stringify(user.TasksList)} */}
    <List
      itemLayout="vertical"
      size="large"
      bordered
      pagination={{
        // onChange: page => {
        //   console.log(page)
        // },
        pageSize: 30,
      }}
      dataSource={fin?toJS(user.TasksListfin):toJS(user.TasksList)}
      renderItem={item => (
        <List.Item
          key={item.taskid}
          actions={[
            <IconText icon={ArrowsAltOutlined} text={item.sf} key="list-vertical-star-o" />,
            <IconText icon={PictureOutlined} text={item.noiselevel} key="list-vertical-like-o" />,
            <IconText icon={CompressOutlined} text={item.customized_kernel_width} key="list-vertical-message" />,
          ]}
          extra={<img
              height={150}
              alt="logo"
              src={item.preview}
            />}>
          <List.Item.Meta
            title={<a href={item.img}>{item.taskid}</a>}
            description={item.date}
          />
          <div>
          <Button type="primary" shape="round" 
            icon={<DownloadOutlined />} 
            disabled={item.state===1? true:false} 
            loading={item.state===2? true:false} 
            size='large'
            href={item.E_path}>
              Download
          </Button>
          </div>

        </List.Item>
      )}
    />
  </>
))

class Tasks extends React.Component {
  constructor(props){
    super(props)
  }

  render() {
    
    return (
      <>
      <PageHeader
        className="site-page-header"
        title={this.props.name}
        backIcon={false}
        subTitle="This is a subtitle"
        extra={[
        <Button key="3" onClick={global.CurrentUser.get_tasks}>刷新</Button>,
        <Button key="2">Operation</Button>,
        <Button key="1" type="primary">Primary</Button>,
        ]}  
      />
      <Taskob user={global.CurrentUser} fin={this.props.fin}/>
      </>
    );
  }
}

export default Tasks