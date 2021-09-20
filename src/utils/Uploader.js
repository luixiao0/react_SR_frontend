import React from "react";
import { Upload, Button } from 'antd';
import { InboxOutlined, WarningOutlined, UploadOutlined } from '@ant-design/icons';

const { Dragger } = Upload;

class Uploader extends React.Component {
  constructor(props) {
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
    global.CurrentUser.newTask(fileList, SRvars, () => {
      this.setState({
        fileList: [],
        uploading: false,
      })
    })
  };

  toggle = () => {
    this.setState({ show: !this.state.show })
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
          <p className="ant-upload-hint">{this.state.fileList.length ? String(this.state.fileList.length) + " file" : "Click or drag file to this area to upload"}</p>
        </Dragger>

        <Button
          icon={<UploadOutlined />}
          type="primary"
          onClick={this.handleUpload}
          disabled={fileList.length === 0}
          loading={uploading}
          style={{ marginTop: 16 }}
        >
          {uploading ? '正在上传' : '开始上传'}
        </Button>
        <Button
          icon={<WarningOutlined />}
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
export default Uploader