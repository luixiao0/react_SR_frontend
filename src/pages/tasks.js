import React from 'react';
import './Tasks.css'
import Taskcard from '../utils/Taskcard.js'
import { Empty } from 'antd';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';


class Tasks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      curpage: 1,
      Tasks: [],
      loaded: false,
      initalized: false
    };
  }
  setter = (page, task, loadstat) => {
    this.setState({
      curpage: page,
      Tasks: task,
      loaded: loadstat,
      initalized: true
    })
  }
  handleClick = () => {
    this.setState({ loaded: false })
    if (this.state.curpage === undefined) {
      this.setState({ curpage: 1 })
    }
    global.CurrentUser.get_tasks(this.state.curpage, this.setter)
  }

  componentDidMount() {
    setTimeout(this.handleClick, 1000)
    this.t = setInterval(() => {
      this.handleClick()
    }, 5000)
  }

  componentWillUnmount() {
    clearInterval(this.t)
  }

  containers = () => {
    if (this.state.Tasks.length) {
      return (
        <div className="container">
          {this.state.Tasks.map(task => {
            return <Taskcard
              refresh={this.handleClick}
              key={task.id}
              id={task.id}
              title={task.date}
              taskstate={task.s}
              params={task.p} />
          })
          }
        </div>)
    }
    else {
      return (<Empty />)
    }
  }

  render() {
    return (
      !this.state.initalized ?
        <Empty image={<Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} />} /> : this.containers()
    )
  }
}

export default Tasks;