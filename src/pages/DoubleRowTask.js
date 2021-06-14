import React from 'react'
import Tasks from './Tasks'
import { Row, Col } from 'antd'
import './minh.css'

function DoubleRowTask() {
    if (global.CurrentUser.TasksList.length===0){
        global.CurrentUser.get_tasks()
    }
    return (
    <Row className='content'>
        <Col flex={1}><Tasks name='finished' fin/></Col>
        <Col flex={1}><Tasks name='unfinished'/></Col>
    </Row>
    )
}

export default DoubleRowTask
