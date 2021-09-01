import React from 'react';
import 'antd/dist/antd.css';
import './Tasks.css'
// import { List, Space, Button, PageHeader } from 'antd';
// import {CompressOutlined, PictureOutlined, ArrowsAltOutlined } from '@ant-design/icons';
// import { DownloadOutlined} from '@ant-design/icons'
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
import { Card, Avatar } from 'antd';
import LazyLoad from 'react-lazyload';
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
  componentDidMount(){
    global.CurrentUser.get_preview(this.props.id, this.setter)
  }

  render(){
    return(
      <>
      <img className="images" src={this.state.img}  alt="" />
      </>
    )
  }
}

class Taskcard extends React.Component{
  shouldComponentUpdate(nextProps, nextState){
    if(nextProps.taskstate === this.props.taskstate) {
      return false
    }
    return true 
  }
  handleDelclick = () => {
    console.log(this.props.id,'del')
    global.CurrentUser.deltask(this.props.id)
    this.props.refresh()
  }
  handleDLclick = () => {
    global.CurrentUser.DLtask(this.props.id)
    // console.log(this.props.id,'DL')
    // global.CurrentUser.DLtask(taskid)
  }
  componentDidUpdate(){
    console.log(this.props.id)
  }
  render() {
    if (this.props.taskstate===1){
      this.finished = true
    }
    return (
      // <div>
      //   <div>
      //     <h2>{this.props.title}</h2>
      //     <figure className={this.finished?"circle active": "circle inactive"}></figure>
      //     <div>
      //       <button disabled={this.finished?false:true} onClick={this.handleDLclick}>download</button>
      //       <button disabled={this.props.taskstate<=3?false:true} onClick={this.handleDelclick}>delete</button>
      //     </div>
      //   </div>
      //   <div>
          // <LazyLoad>
          //   <Image id={this.props.id}/>
          // </LazyLoad>
      //     <p>{this.props.id}</p>

      //   </div>
      // </div>
      <Card className="cards"
        cover={
          <LazyLoad>
            <Image id={this.props.id}/>
          </LazyLoad>
        }
        actions={[
          <span>{this.props.params[0]} </span>,
          <span>{this.props.params[1]} </span>,
          <span>{this.props.params[2]} </span>
          // <SettingOutlined key="setting" />,
          // <EditOutlined key="edit" />,
          // <EllipsisOutlined key="ellipsis" />,
        ]}
      >
        <Meta
          avatar={<figure className={this.finished?"circle active": "circle inactive"}/>}
          title={this.props.id}
          description={this.props.title}
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
      Tasks: []
    };
    this.setter.bind(this)
  }
  setter = (page, task) =>{
    this.setState({
        curpage: page,
        Tasks: task
    })
    // console.log(this.state)
  }
  handleClick = () => {
    if(this.state.curpage === undefined){
      this.setState({curpage: 1})
    }
    global.CurrentUser.get_tasks(this.state.curpage, this.setter)
    console.log('refreshed')
  }
  componentDidMount(){
    this.handleClick()
    this.t = setInterval(()=>{
      this.handleClick()
      // console.log('refreshed')
    },10000)
  }

  componentWillUnmount(){
    clearInterval(this.t)
  }

  render(){
    return (
      <>
        <button onClick={this.handleClick}>change</button>
        <div className="content">
        {this.state.Tasks.map(task=>{
          // console.log(task)
          return <Taskcard refresh={this.handleClick} key={task.id} id={task.id} title={task.date} taskstate={task.s} params={task.p}/>
        })}
        </div>
      </>
    )
  }
}

export default Tasks;