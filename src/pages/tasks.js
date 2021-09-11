import React from 'react';
import './Tasks.css'
// import { List, Space, Button, PageHeader } from 'antd';
// import {CompressOutlined, PictureOutlined, ArrowsAltOutlined } from '@ant-design/icons';
// import { DownloadOutlined} from '@ant-design/icons'
import { Card, Empty } from 'antd';
import { Button, Tooltip,Spin } from 'antd';
import LazyLoad from 'react-lazyload';
import { DownloadOutlined,LoadingOutlined } from '@ant-design/icons';

import { Tag } from 'antd';
const { Meta } = Card;

class Image extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      img:"",
    }
  }
  setter = (file) =>{
    this.setState({
      img:file,
    })
    // console.log(this.state)
  }
  // shouldComponentUpdate(props, state){
  //   if(state.img != this.state.img){
  //     return true
  //   }
  //   return false
  // }
  componentDidMount(){
    if(!this.state.img){
      global.CurrentUser.get_preview(this.props.id, this.setter)
    }
  }
  // componentWillUnmount(){
  //   // console.log(this.state.img)
  //   URL.revokeObjectURL(this.state.img)
  // }
  render(){
    return(
      <>
      <img className="images" src={this.state.img}  alt="" />
      </>
    )
  }
}

const Tooltips = (params) => {
  const scale = params.params.scale
  const anime = params.params.anime
  if(anime){
    return(
      <>
      {/* <Tooltip title="噪声"><span>{this.props.params.noise} </span> <Divider type="vertical" /></Tooltip> */}
      <Tooltip title="放大倍数"><Tag>{scale}x</Tag></Tooltip>
      {/* <Tooltip title="自定义核大小"><span>{this.props.params.kernel_width} </span> <Divider type="vertical" /> </Tooltip> */}
      <Tooltip title="动漫图片"><Tag color="cyan">动漫图片</Tag></Tooltip>
      </>
    )
    
  }
  else{
    return(
      <>
      {/* <Tooltip title="噪声"><span>{this.props.params.noise} </span> <Divider type="vertical" /></Tooltip> */}
      <Tooltip title="放大倍数"><Tag>{scale}x</Tag></Tooltip>
      {/* <Tooltip title="自定义核大小"><span>{this.props.params.kernel_width} </span> <Divider type="vertical" /> </Tooltip> */}
      <Tooltip title="真实图片"><Tag color="blue">真实图片</Tag></Tooltip>
      </>
    )

  }
}


class Taskcard extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      DLload : false,
      Delload : false,
    }
  }
  shouldComponentUpdate(nextProps, nextState){
    if (nextState.DLload !== this.state.DLload || nextState.Delload !== this.state.Delload){
      return true
    }
    if(nextProps.taskstate === this.props.taskstate) {
      return false
    }
    return true 
  }
  handleDelclick = () => {
    this.setState({Delload: true})
    global.CurrentUser.deltask(this.props.id, ()=>{
      this.setState({Delload: false})
      this.props.refresh()
    })
  }
  handleDLclick = () => {
    this.setState({DLload: true})
    global.CurrentUser.DLtask(this.props.id, ()=>{
      this.setState({DLload: false})
      this.props.refresh()
    })
  }
  render() {
    if (this.props.taskstate===1){
      this.finished = true
    }
    else{
      this.finished = false
      if (this.props.taskstate===-1){
        this.failed = true
      }
    }
    return (
      <Card className="cards"
        cover={
          <LazyLoad>
            <Image id={this.props.id}/>
          </LazyLoad>
        }
        actions={[
          <Button type="primary" loading={this.state.DLload} disabled={this.finished?false:true} onClick={this.handleDLclick} icon={<DownloadOutlined />}>下载</Button>,
          <Button type="primary" loading={this.state.Delload} onClick={this.handleDelclick} icon={<DownloadOutlined />}>删除</Button>
          // <SettingOutlined key="setting" />,
          // <EditOutlined key="edit" />,
          // <EllipsisOutlined key="ellipsis" />,
        ]}
      >
        <Meta
          avatar={<Tooltip title="任务状态"><figure className={this.finished?"circle active": this.failed?"circle failed":"circle inactive"}/></Tooltip>}
          title={
          <div>
          <Tooltip title={this.props.title}>{this.props.id}</Tooltip>
          <span className="align-right">
            <Tooltips params={this.props.params}/>
          </span></div>}
          // description={this.props.title}
        />
      </Card>
    );
  }
};


class Tasks extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      curpage: 1,
      Tasks: [],
      loaded:false
    };
    // this.setter.bind(this)
  }
  setter = (page, task, loadstat) =>{
    console.log("loaded",loadstat)
    this.setState({
        curpage: page,
        Tasks: task,
        loaded: loadstat
    })
    // console.log(this.state)
  }
  handleClick = () => {
    this.setState({loaded: false})
    if(this.state.curpage === undefined){
      this.setState({curpage: 1})
    }
    global.CurrentUser.get_tasks(this.state.curpage, this.setter)
    // console.log('refreshed')
  }
  componentDidMount(){
    setTimeout(this.handleClick,1000)
    this.t = setInterval(()=>{
      this.handleClick()
      // console.log('refreshed')
    },5000)
  }

  componentWillUnmount(){
    clearInterval(this.t)
  }

  render(){
    console.log(this.state.Tasks)
    return (
      <>
      <Tooltip title="刷新状态"><figure className={this.state.loaded?"circle active": "circle inactive"}/></Tooltip>
      {!this.state.Tasks.length?
        <Empty image={<Spin indicator={<LoadingOutlined style={{fontSize:24}} spin/>} />} />:
        <div className="container">
          {this.state.Tasks.map(task=>{
            return <Taskcard 
              refresh={this.handleClick} 
              key={task.id} 
              id={task.id} 
              title={task.date} 
              taskstate={task.s} 
              params={task.p}/>
          })}
        </div>
      }
      </>
    )
  }
}

export default Tasks;