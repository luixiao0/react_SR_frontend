import React from 'react';
import 'antd/dist/antd.css';
import './login.css'
import { List, Space, Button, PageHeader } from 'antd';
import {CompressOutlined, PictureOutlined, ArrowsAltOutlined } from '@ant-design/icons';
import { DownloadOutlined} from '@ant-design/icons'
import { observer } from "mobx-react"
import {toJS} from "mobx"




class Tasks extends React.Component {
  // constructor(props){
  //   super(props)
  // }

  handleDelclick = (taskid, e) => {
    //console.log(item,e)
    global.CurrentUser.deltask(taskid)
  }

  IconText = ({ icon, text }) => (
    <Space>
      {React.createElement(icon)}
      {text}
    </Space>
  );
  Taskob = observer(({user, taskls}) => (
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
        dataSource={toJS(taskls)}
        renderItem={item => (
          <List.Item
            key={item.taskid}
            actions={[
              <this.IconText icon={ArrowsAltOutlined} text={item.sf} key="list-vertical-star-o" />,
              <this.IconText icon={PictureOutlined} text={item.noiselevel} key="list-vertical-like-o" />,
              <this.IconText icon={CompressOutlined} text={item.customized_kernel_width} key="list-vertical-message" />,
            ]}
            extra={<img
                height={150}
                alt="preview"
                src={global.CurrentUser.previewhref+item.taskid}
              />}>
            <List.Item.Meta
              title={<a href={item.img}>{item.taskid}</a>}
              description={item.date}
            />
            <div>
            <Button type="primary" shape="round" 
              icon={<DownloadOutlined />} 
              // disabled={item.state===1? true:false} 
              loading={item.state===2? true:false} 
              size='large'
              className="button"
              href={global.CurrentUser.dloadhref + item.taskid}>
                Download
            </Button>
            <Button type="primary" shape="round" 
              icon={<DownloadOutlined />} 
              // disabled={item.state===1? true:false} 
              loading={item.state===2? true:false} 
              size='large'
              className="button"
              taskid={item.taskid}
              onClick={(e) => this.handleDelclick(item.taskid,e)}>
                Delete
            </Button>
            </div>
  
          </List.Item>
        )}
      />
    </>
  ))
  render() {
    
    return (
      <>
      <PageHeader
        className="site-page-header"
        title={this.props.name}
        backIcon={false}
        subTitle="This is a subtitle"
        extra={[
        <Button key="2" onClick={global.CurrentUser.get_tasks}>刷新</Button>,
        // <Button key="2" onClick={global.CurrentUser.dsplay}>Operation</Button>,
        <Button key="1" type="primary">Primary</Button>,
        ]}  
      />
      <this.Taskob taskls={this.props.fin? global.CurrentUser.TasksListfin: global.CurrentUser.TasksList}/>
      </>
    );
  }
}

export default Tasks