import React from 'react';
import 'antd/dist/antd.css';
import { Upload, message } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import './upload.css'
import { Space, Slider, InputNumber, Row, Col } from 'antd';
import Tasks from './Tasks'

const { Dragger } = Upload;

class SliderUpload extends React.Component{
    props = {
        name: 'file',
        sf:0,
        noise:3,
        kernel_width:0,
        multiple: true,
        action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
        onChange(info) {
          const { status } = info.file;
          if (status !== 'uploading') {
            console.log(info.file, info.fileList);
          }
          if (status === 'done') {
            message.success(`${info.file.name} file uploaded successfully.`);
          } else if (status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
          }
        },
    };
    render(){
        return(
            <div>
            <Dragger {...this.props}>
            <p className="ant-upload-drag-icon">
                <InboxOutlined />
            </p>
            <p className="ant-upload-text">Click or drag file to this area to upload</p>
            <p className="ant-upload-hint">
                Support for a single or bulk upload
            </p>
            </Dragger>
            </div>
        )
    }

}




class CusSlider extends React.Component{
    constructor (props) {
        super(props);
    }

    onFieldChange = value => {
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
    constructor (props) {
        super(props);
    }
    onChange (name, value) {
        if (isNaN(value)) {
          return;
        }
        this.setState({
          [name]: value,
        });
    };
    render(){
        return(
            <div className="sliderdiv">
                
            <h3>设置</h3>
            <CusSlider 
            min={2} max={4} step={1}
            name='scale' 
            inputValue={this.state.scale} 
            onChange={this.onChange.bind(this)}
            />
            <CusSlider 
            min={0} max={16} step={0.1}
            name='noiselevel' 
            inputValue={this.state.noiselevel} 
            onChange={this.onChange.bind(this)}
            />
            <CusSlider 
            min={0} max={2} step={0.1}
            name='kernel_width' 
            inputValue={this.state.kernel_width} 
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
    constructor(){
        this.state = {
            scale:2,
            noiselevel:3,
            kernel_width:0,
            filename:'file',
            uid:''
        };
    }
    onChange(name, value){
        this.setState({
            [name]: value,
        });
    }

    action(){
        
    }


    render(){
        return(
            <div>
                <Row className='row'>
                <Col flex={1}><Sliders/></Col>
                <Col flex={1}><SliderUpload/></Col>
                </Row>
                <hr/>
                <Tasks name='unfinished'/>
            </div>
        )
    }
}

export default Uploadpage
