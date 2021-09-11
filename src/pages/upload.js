import React from 'react';
import 'antd/dist/antd.css';
import { Upload, Button } from 'antd';
import { InboxOutlined,WarningOutlined } from '@ant-design/icons';
import './minh.css'
import { Slider, InputNumber, Row, Col } from 'antd';
import Tasks from './Tasks.js'
import { Menu } from 'antd';
import { MailOutlined, AppstoreOutlined, SettingOutlined } from '@ant-design/icons';
import { Divider } from 'rc-menu';

const { SubMenu } = Menu;
// const { Dragger } = Upload;

class SliderUpload extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      fileList: [],
      uploading: false,
    };
  }
  handleUpload = () => {
    this.setState({
      uploading: true,
    });
    const fileList = this.state.fileList
    const SRvars = this.props.state
    global.CurrentUser.newTask(fileList, SRvars, ()=>{this.setState({uploading: false})})
    // setTimeout(()=>{
    //   this.setState({
    //     uploading: false,
    //   });
    // },1000)

  };
    render() {
    const { fileList, uploading } = this.state;
    const props = {
      onRemove: file => {
        this.setState(state => {
          const index = state.fileList.indexOf(file);
          const newFileList = state.fileList.slice();
          newFileList.splice(index, 1);
          return {
            fileList: newFileList,
            uploading: false
          };
        });
      },
      beforeUpload: file => {
        this.setState(state => ({
          fileList: [...state.fileList, file],
        }));
        return false;
      },
      fileList,
    };

    return (
      <div className="align-center">
        <Upload {...props}>
          <Button icon={<InboxOutlined />}>选择文件</Button>
        </Upload>

        <Button
          icon ={<WarningOutlined />}
          type="primary"
          onClick={this.handleUpload}
          disabled={fileList.length === 0}
          loading={uploading}
          style={{ marginTop: 16 }}
        >
          {uploading ? '正在上传' : '开始上传'}
        </Button>
      </div>
    );
  }
}






class CusSlider extends React.Component{
    onFieldChange = value => {
        if (isNaN(value)) {
            return;
        }
        const fieldName = this.props.name;
        const fieldValue = value;
        this.props.onChange(fieldName, fieldValue);
    }

    render(){
      if (this.props.disabled){
        return (
            <>
            </>
          )
      }
        return(
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
            <Col flex={1}>
                <InputNumber
                min={this.props.min}
                max={this.props.max}
                style={{ margin: '0 16px' }}
                step={this.props.step}
                onChange={this.onFieldChange}
                value={this.props.inputValue}
                />
            </Col>
        </Row>
    )
    }
}



class Sliders extends React.Component{
    // constructor (props) {
    //     super(props);
    // }
  onChange (name, value) {
    this.props.onChange(name, value);
  };

  tips = () =>{
    if(this.props.state.anime){
      return (
        <>
          <div>scale:放大倍率,默认4倍</div>
        </>
      )
    }
    else{
      return (
        <>
          <div>scale:放大倍率,默认2倍</div>
          <div>noiselevel:主观噪声,噪点越多则越高(处理后图像更平滑)</div>
          <div>kernelwidth:模糊核,默认0,越高的值会输出更锐利的边缘</div>
        </>
      )
    }
  }

  render(){
    return(
      <div className="slider">
        <Menu selectedKeys={[this.props.state.anime?'2':'3']} mode="horizontal">
          <Menu.Item key='3' icon={<AppstoreOutlined />} onClick={()=>{
            this.onChange("anime", false)
            this.onChange('scale', 2)
          }}>
            三次元
          </Menu.Item>
          <Menu.Item key='2' icon={<AppstoreOutlined />} onClick={()=>{
            this.onChange("anime", true)
            this.onChange('scale', 4)
          }}>
            二次元
          </Menu.Item>
          <Menu.Item key='1' disabled>
            coming soon...
          </Menu.Item>
        </Menu>

      <h3>设置</h3>
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
        disabled = {this.props.state.anime}
        inputValue={this.props.state.noiselevel} 
        onChange={this.onChange.bind(this)}
      />
      <CusSlider 
        min={0} max={2} step={0.1}
        name='kernel_width' 
        disabled = {this.props.state.anime}
        inputValue={this.props.state.kernel_width} 
        onChange={this.onChange.bind(this)}
      />
      </div>
    )
  }

}


class Uploadpage extends React.Component{
  state = {
    scale:4,
    noiselevel:3,
    kernel_width:0,
    anime:true
  };

  onChange(name, value){
    this.setState({
        [name]: value,
    });
    // console.log(this.state)
  }

  componentDidMount(){
    setTimeout(global.CurrentUser.get_tasks, 1000);
  }

  render(){
    return(
      <>
        <Row className='row'>
            <Col flex={1}><Sliders onChange={this.onChange.bind(this)} state={this.state}/></Col>
            <Col flex={1}><SliderUpload state={this.state}/></Col>
        </Row>
          {/* <hr/> */}
      {/* </div> */}
      <div>
        <Tasks name='tasks'/>
      </div>
      </>
    )
  }
}

export default Uploadpage
