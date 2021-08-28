import React from 'react';
import 'antd/dist/antd.css';
import './login.css'
import { List, Space, Button, PageHeader } from 'antd';
import {CompressOutlined, PictureOutlined, ArrowsAltOutlined } from '@ant-design/icons';
import { DownloadOutlined} from '@ant-design/icons'
import LazyLoad from 'react-lazyload';

class Taskcard extends React.Component{
  shouldComponentUpdate(nextProps, nextState){
    console.log(nextProps, nextState)
    if(nextProps.state === this.props.state) {
      return false
    }
    return true
  }
  render() {
    const { title, params, state} = this.props;
    return (
      <div>
        <div>
          <h2>{title}</h2>
          <button disabled={state===1?false:true}>download</button>
          <button disabled={state<2?false:true}>delete</button>
        </div>
        <LazyLoad>
        <div>
          <image>{title}</image>
          <p>{params}</p>
        </div>
        </LazyLoad>
      </div>
    );
  }
};


class Tasks extends React.Component {
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

  handleRefclick = () => {
    global.CurrentUser.get_tasks()
    this.forceUpdate()
    console.log(global.CurrentUser.TasksList)
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
        <Button key="2" onClick={this.handleRefclick}>刷新</Button>,
        <Button key="1" type="primary">Primary</Button>,
        ]}  
      />
      
      </>
    );
  }
}

export default Tasks