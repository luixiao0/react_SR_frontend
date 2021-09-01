import React from 'react';
import 'antd/dist/antd.css';
import { Upload, Button } from 'antd';
import { InboxOutlined,WarningOutlined } from '@ant-design/icons';
import './minh.css'
import { Slider, InputNumber, Row, Col } from 'antd';
import Tasks from './Tasks'

// const { Dragger } = Upload;

class SliderUpload extends React.Component{
    state = {
        fileList: [],
        uploading: false,
    };
    handleUpload = () => {
        const { fileList } = this.state;
        this.setState({
          uploading: true,
        });
        const SRvars = this.props.state
        global.CurrentUser.newTask(fileList, SRvars)

        this.setState({
            uploading: false,
        });
      };
      render() {
        const { uploading, fileList } = this.state;
        const props = {
          onRemove: file => {
            this.setState(state => {
              const index = state.fileList.indexOf(file);
              const newFileList = state.fileList.slice();
              newFileList.splice(index, 1);
              return {
                fileList: newFileList,
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
          <>
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
          </>
        );
      }
    }



//     render(){
//         return(
//             <div>
//             <Dragger {...this.action}>
//             <p className="ant-upload-drag-icon">
//                 <InboxOutlined />
//             </p>
//             <p className="ant-upload-text">Click or drag file to this area to upload</p>
//             <p className="ant-upload-hint">
//                 当前参数：
//                 倍数:{this.props.state["scale"]},  
//                 噪声等级:{this.props.state["noiselevel"]},  
//                 核宽度:{this.props.state["kernel_width"]}
//             </p>
//             </Dragger>
//             </div>
//         )
//     }

// }




class CusSlider extends React.Component{
    // constructor (props) {
    //     super(props);
    // }

    onFieldChange = value => {
        if (isNaN(value)) {
            return;
        }
        // for a regular input field, read field name and value from the event
        const fieldName = this.props.name;
        const fieldValue = value;
        this.props.onChange(fieldName, fieldValue);
    }

    render(){
        return(
        <Row>
            <Col offset={2} span={6}>
                <p>{this.props.name}</p>
            </Col>
            <Col offset={1} flex={5}>
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
    render(){
        return(
            <div>
                
            <h3>设置</h3>
            <CusSlider 
            min={2} max={4} step={1}
            name='scale' 
            inputValue={this.props.state.scale} 
            onChange={this.onChange.bind(this)}
            />
            <CusSlider 
            min={0} max={16} step={0.1}
            name='noiselevel' 
            inputValue={this.props.state.noiselevel} 
            onChange={this.onChange.bind(this)}
            />
            <CusSlider 
            min={0} max={2} step={0.1}
            name='kernel_width' 
            inputValue={this.props.state.kernel_width} 
            onChange={this.onChange.bind(this)}
            />


            {/* <IntegerStep>scale</IntegerStep>
            <DecimalStep>noiselevel</DecimalStep>
            <DecimalStep>kernel_width</DecimalStep> */}
            </div>
        )
    }

}


class Uploadpage extends React.Component{
    state = {
        scale:2,
        noiselevel:3,
        kernel_width:0,
    };

    onChange(name, value){
        this.setState({
            [name]: value,
        });
    }

    componentDidMount(){
        global.CurrentUser.get_tasks()
    }


    render(){
        return(
            <div className="content">
                {/* <hr/> */}
                    帮助文本
                {/* <hr/> */}
                <Row className='row'>
                    <Col flex={1}><Sliders onChange={this.onChange.bind(this)} state={this.state}/></Col>
                    <Col flex={1}><SliderUpload state={this.state}/></Col>
                </Row>
                {/* <hr/> */}
                <Tasks/>
            </div>
        )
    }
}

export default Uploadpage
