import React from 'react';
import 'antd/dist/antd.css';
import './Tasks.css'
// import { List, Space, Button, PageHeader } from 'antd';
// import {CompressOutlined, PictureOutlined, ArrowsAltOutlined } from '@ant-design/icons';
// import { DownloadOutlined} from '@ant-design/icons'
// import LazyLoad from 'react-lazyload';

class Taskcard extends React.Component{
  shouldComponentUpdate(nextProps, nextState){
    if(nextProps.taskstate === this.props.taskstate) {
      return false
    }
    return true 
  }
  handleDelclick = () => {
    console.log(this.props.id,'del')
    // global.CurrentUser.deltask(taskid)
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
      // <LazyLoad>
      <div>
        <div>
          <h2>{this.props.title}</h2>
          <figure className={this.finished?"circle active": "circle inactive"}></figure>
          <div>
            <button disabled={this.finished?false:true} onClick={this.handleDLclick}>download</button>
            <button disabled={this.props.taskstate<2?false:true} onClick={this.handleDelclick}>delete</button>
          </div>
        </div>
        <div>
          <p>{this.props.id}</p>
          <h2>{this.props.taskstate}</h2>
          <p>{this.props.params.map(param => {return <span> {param} </span>})}</p>
        </div>
      </div>
      // </LazyLoad>
    );
  }
};

// class Tasks extends React.Component {
//   constructor(props){
//     super(props)
//     this.state = {
//       showall: false,
//       curpage: 1,
//       taskdiv: ''
//     }
//     this.updateState = this.updateState.bind(this) 
//   }
//   handleRefclick = () => {
//     global.CurrentUser.get_tasks("1")
//     this.forceUpdate()
//   }
//   handleFliterclick = () => {
//     this.state.showall = !this.state.showall
//     this.setState(this.state)
//   }
//   componentDidMount = () => {
//     this.handleRefclick()
//     this.t = setInterval(()=>{
//       this.updateState()
//     }, 5000)

//   }
//   componentWillUnmount = () => {
//     clearInterval(this.t)
//   }

//   listOfTasks(){
//     return (
//       <div> 
//         {global.CurrentUser.TasksList.map(task => ( 
//           <div>{1}</div>
//         ))}
//       </div> 
//     )
//   }

//   updateState(){
//     global.CurrentUser.get_tasks(this.state.curpage)
//     this.state.taskdiv = this.listOfTasks()
//     this.setState(this.state)
//     console.log(this.state)
//   } 

//   render() {
//     return (
//       <>
//         {/* <PageHeader
//           className="site-page-header"
//           title={this.props.name}
//           backIcon={false}
//           subTitle="This is a subtitle"
//           extra={[
//           <Button key="2" onClick={this.handleRefclick}>刷新</Button>,
//           <Button key="1" type="primary" onClick={this.handleFliterclick}>{this.state.showall?"已完成":"全部"}</Button>,
//           ]}  
//         /> */}
//         <p>{this.taskdiv}</p>
//       </>
//     );
//   }
// }


class Tasks extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      curpage: 1,
      Tasks: []
    };
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
      <div>
        <button onClick={this.handleClick}>change</button>
        {this.state.Tasks.map(task=>{
          // console.log(task)
          return <Taskcard id={task.id} title={task.date} taskstate={task.s} params={task.p}/>
        })}
      </div>
    )
  }
}

export default Tasks;