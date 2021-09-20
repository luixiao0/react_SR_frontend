import Image from '../utils/Image.js';
import Tooltips from '../utils/Tooltips.js';
import { DownloadOutlined } from '@ant-design/icons';
import LazyLoad from 'react-lazyload';
import { Button, Tooltip, Card } from 'antd';
import React from 'react';

const { Meta } = Card;
class Taskcard extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      DLload: false,
      Delload: false,
    }
  }
  shouldComponentUpdate(nextProps, nextState) {
    if (nextState.DLload !== this.state.DLload || nextState.Delload !== this.state.Delload) {
      return true
    }
    if (nextProps.taskstate === this.props.taskstate) {
      return false
    }
    return true
  }
  handleDelclick = () => {
    this.setState({ Delload: true })
    global.CurrentUser.deltask(this.props.id, () => {
      this.setState({ Delload: false })
      this.props.refresh()
    })
  }
  handleDLclick = () => {
    this.setState({ DLload: true })
    global.CurrentUser.DLtask(this.props.id, () => {
      this.setState({ DLload: false })
      this.props.refresh()
    })
  }
  render() {
    if (this.props.taskstate === 1) {
      this.finished = true
    }
    else {
      this.finished = false
      if (this.props.taskstate === -1) {
        this.failed = true
      }
    }
    return (
      <Card className="cards"
        cover={
          <LazyLoad>
            <Image id={this.props.id} />
          </LazyLoad>
        }
        actions={[
          <Button type="primary" loading={this.state.DLload} disabled={this.finished ? false : true} onClick={this.handleDLclick} icon={<DownloadOutlined />}>下载</Button>,
          <Button type="primary" loading={this.state.Delload} onClick={this.handleDelclick} icon={<DownloadOutlined />}>删除</Button>
        ]}
      >
        <Meta
          avatar={<Tooltip title="任务状态"><figure className={this.finished ? "circle active" : this.failed ? "circle failed" : "circle inactive"} /></Tooltip>}
          title={
            <div>
              <Tooltip title={this.props.title}>{this.props.id}</Tooltip>
              <span className="align-right">
                <Tooltips params={this.props.params} />
              </span>
            </div>}
        />
      </Card>
    );
  }
};
export default Taskcard