import React from 'react'
import './minh.css'


class FirstPage extends React.Component {
    // constructor(props){
    //     super(props)
    // }

    render(){
        if (this.props.logout){
            console.log('out')
            global.CurrentUser.logout()   
        }
        return(
            <div className='align-right'>
                <div>在线超分-开发版,请到侧边栏"上传"页进行图片上传</div>
                <div>建议传小图,大图会内存不足导致失败并挂起任务</div>
                <div>虽然是这么说,但是实测1080p可以放大2倍无问题</div>
                <div>目前后端-GTX1080</div>
            </div>
        )
    }
}

export default FirstPage
