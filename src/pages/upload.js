import React from 'react';
import 'antd/dist/antd.css';
import { Upload, Button } from 'antd';
import { InboxOutlined,WarningOutlined,UploadOutlined,SmileOutlined } from '@ant-design/icons';
import './minh.css'
import { Slider, Row, Col,Menu } from 'antd';
import Tasks from './Tasks.js'
import { AppstoreOutlined } from '@ant-design/icons';

// const { SubMenu } = Menu;
const { Dragger } = Upload;

class SliderUpload extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      fileList: [],
      uploading: false
    };
  }
  handleUpload = () => {
    this.setState({
      uploading: true,
    });
    const fileList = this.state.fileList
    const SRvars = this.props.state
    global.CurrentUser.newTask(fileList, SRvars, ()=>{this.setState({
      fileList: [],
      uploading: false,
    })})
  };
  
  toggle = () => {
    this.setState({show: !this.state.show})
  }
  render() {
    const { fileList, uploading } = this.state;
    const props = {
      multiple: true,
      showUploadList: this.state.show,
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
        {/* <Upload {...props}>
          <Button icon={<InboxOutlined />}>选择文件</Button>
        </Upload> */}
        <Dragger {...props}>
          <p className="ant-upload-drag-icon">
            <InboxOutlined />
          </p>
          <p className="ant-upload-hint">{this.state.fileList.length? String(this.state.fileList.length)+" file":"Click or drag file to this area to upload"}</p>
        </Dragger>
        
        <Button
          icon ={<UploadOutlined />}
          type="primary"
          onClick={this.handleUpload}
          disabled={fileList.length === 0}
          loading={uploading}
          style={{ marginTop: 16 }}
        >
          {uploading ? '正在上传' : '开始上传'}
        </Button>
        <Button
          icon ={<WarningOutlined />}
          type="secondary"
          onClick={this.toggle}
          // disabled={fileList.length === 0}
          style={{ marginTop: 16 }}
        >
          {this.state.show ? '显示列表' : '隐藏列表'}
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
            <Col flex={1}/>
            {/* <Col flex={1}>
                <InputNumber
                min={this.props.min}
                max={this.props.max}
                style={{ margin: '0 16px' }}
                step={this.props.step}
                onChange={this.onFieldChange}
                value={this.props.inputValue}
                />
            </Col> */}
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
        <div className="tips">
          <div>scale:放大倍率,默认4倍</div>
        </div>
      )
    }
    else{
      return (
        <div className="tips">
          <div>scale:放大倍率,默认2倍</div>
          <div>noiselevel:主观噪声,噪点越多则越高(处理后图像更平滑)</div>
          <div>kernelwidth:模糊核,默认0,越高的值会输出更锐利的边缘</div>
        </div>
      )
    }
  }

  render(){
    return(
      <div className="slider">
        <Menu selectedKeys={[this.props.state.anime?'2':'3']} mode="horizontal">
          <Menu.Item key='2' icon={<SmileOutlined />} onClick={()=>{
            this.onChange("anime", true)
            this.onChange('scale', 4)
          }}>
            二次元
          </Menu.Item>
          <Menu.Item key='3' 
            disabled icon={<AppstoreOutlined />} onClick={()=>{
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
            <Col flex={5} ><Sliders onChange={this.onChange.bind(this)} state={this.state}/></Col>
            <Col flex={5} offset={1}><SliderUpload state={this.state}/></Col>
            <Col flex={1} ></Col>
        </Row>
      <div>
        <hr/>
        <Tasks name='tasks'/>
      </div>
      </>
    )
  }
}

export default Uploadpage
