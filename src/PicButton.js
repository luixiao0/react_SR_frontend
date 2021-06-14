import React from 'react'
import {Link} from 'react-router-dom';
import { UploadOutlined, UserOutlined, VideoCameraOutlined } from '@ant-design/icons';
import { Menu } from 'antd';




class CustomMenu extends React.Component {
    constructor(){
        super()
        this.menus = [
            {
                title: '首页',
                icon: <VideoCameraOutlined />,
                key: '/',
            },
            {
                title: '任务',
                icon: <VideoCameraOutlined />,
                key: '/tasks',
            },
            {
                title: '上传',
                icon: <UploadOutlined />,
                key: '/upload',
            },
        ]

        if(!global.CurrentUser.logState){
            this.logbutton = {
                title:"登出",
                icon:<UserOutlined/>,
                key:'/logout'
            }
        }
        else{
            this.logbutton = {
                title:"登出",
                icon:<UserOutlined/>,
                key:'/logout'
            }
        }
        this.menus.push(this.logbutton)
    }
    renderMenuItem = ({key, icon, title,}) => {
        return (
            <Menu.Item key={key}>
                <Link to={key}>
                    {icon}
                    <span>{title}</span>
                </Link>
            </Menu.Item>
        )
    }
    render() {
        return (
                <Menu
                defaultSelectedKeys={['1']}
                mode="inline"
                theme="dark"
                >
                {
                    this.menus.map(item => {
                        return item.subs && item.subs.length > 0 ? this.renderSubMenu(item) : this.renderMenuItem(item)
                    })
                }
            </Menu>
        )
    }
}
export default CustomMenu
