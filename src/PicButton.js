import React from 'react'

class PicButton extends React.Component{
    render(){
    return (
        <div>
            {/* <Button type="primary" shape="round" icon={<DownloadOutlined />} size='large' href={this.props.imgfin} >download</Button> */}
            <img
              width={200}
              alt="logo"
              src={this.props.preview}
            />
        </div>
        )
    }
}

export default PicButton