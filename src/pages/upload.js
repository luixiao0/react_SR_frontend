import React from 'react';
import './minh.css'
import { Slider, Row, Col, Menu } from 'antd';
import Tasks from './Tasks.js'
import Uploader from '../utils/Uploader.js';
import { AppstoreOutlined, SmileOutlined } from '@ant-design/icons';



class CusSlider extends React.Component {
  onFieldChange = value => {
    if (isNaN(value)) {
      return;
    }
    const fieldName = this.props.name;
    const fieldValue = value;
    this.props.onChange(fieldName, fieldValue);
  }

  render() {
    if (this.props.disabled) {
      return (
        <>
        </>
      )
    }
    return (
      <Row>
        <Col offset={1} span={6}>
          <p>{this.props.name}</p>
        </Col>
        <Col offset={0} flex={6}>
          <Slider
            min={this.props.min}
            max={this.props.max}
            onChange={this.onFieldChange}
            value={typeof this.props.inputValue === 'number' ? this.props.inputValue : this.props.min}
            step={this.props.step}
          />
        </Col>
        <Col flex={1} />
      </Row>
    )
  }
}



class Sliders extends React.Component {
  onChange(name, value) {
    this.props.onChange(name, value);
  };

  tips = () => {
    if (this.props.state.anime) {
      return (
        <div className="tips">
          <div>scale:放大倍率,默认4倍</div>
        </div>
      )
    }
    else {
      return (
        <div className="tips">
          <div>scale:放大倍率,默认2倍</div>
          <div>noiselevel:主观噪声,噪点越多则越高(处理后图像更平滑)</div>
          <div>kernelwidth:模糊核,默认0,越高的值会输出更锐利的边缘</div>
        </div>
      )
    }
  }

  render() {
    return (
      <div className="slider">
        <Menu selectedKeys={[this.props.state.anime ? '2' : '3']} mode="horizontal">
          <Menu.Item key='2' icon={<SmileOutlined />} onClick={() => {
            this.onChange("anime", true)
            this.onChange('scale', 4)
          }}>
            二次元
          </Menu.Item>
          <Menu.Item key='3'
            disabled icon={<AppstoreOutlined />} onClick={() => {
              this.onChange("anime", false)
              this.onChange('scale', 2)
            }}>
            三次元
          </Menu.Item>
          <Menu.Item key='1' disabled>
            coming soon...
          </Menu.Item>
        </Menu>

        {/* <h3>设置</h3> */}
        <Row>
          <Col offset={1}>
            {this.tips()}
          </Col>
        </Row>

        <CusSlider
          min={2} max={4} step={1}
          name='scale'
          inputValue={this.props.state.scale}
          onChange={this.onChange.bind(this)}
        />
        <CusSlider
          min={0} max={16} step={0.1}
          name='noiselevel'
          disabled={this.props.state.anime}
          inputValue={this.props.state.noiselevel}
          onChange={this.onChange.bind(this)}
        />
        <CusSlider
          min={0} max={2} step={0.1}
          name='kernel_width'
          disabled={this.props.state.anime}
          inputValue={this.props.state.kernel_width}
          onChange={this.onChange.bind(this)}
        />
      </div>
    )
  }
}


class Uploadpage extends React.Component {
  state = {
    scale: 4,
    noiselevel: 3,
    kernel_width: 0,
    anime: true
  };

  onChange(name, value) {
    this.setState({
      [name]: value,
    });
    // console.log(this.state)
  }

  componentDidMount() {
    setTimeout(global.CurrentUser.get_tasks, 1000);
  }

  render() {
    return (
      <>
        <Row className='row'>
          <Col flex={5} ><Sliders onChange={this.onChange.bind(this)} state={this.state} /></Col>
          <Col flex={5} offset={1}><Uploader state={this.state} /></Col>
          <Col flex={1} ></Col>
        </Row>
        <div>
          <hr />
          <Tasks name='tasks' />
        </div>
      </>
    )
  }
}

export default Uploadpage
