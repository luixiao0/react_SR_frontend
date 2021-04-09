import React from 'react'
import {Link} from 'react-router-dom';
import { UploadOutlined, UserOutlined, VideoCameraOutlined } from '@ant-design/icons';
import { Layout, Menu } from 'antd';

global.menus = [
    {
        title: '首页',
        icon: <UserOutlined />,
        key: '/login'
    },   {
        title: '其它',
        icon: <VideoCameraOutlined />,
        key: '/tasks',
     },
]
const menus =global.menus;
//此组件的意义就是将数据抽离出来，通过传递数据去渲染
class CustomMenu extends React.Component {

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
                    menus.map(item => {
                        return item.subs && item.subs.length > 0 ? this.renderSubMenu(item) : this.renderMenuItem(item)
                    })
                }
            </Menu>
        )
    }
}
export default CustomMenu
