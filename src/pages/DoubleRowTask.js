import React from 'react'
import Tasks from './Tasks.js'
import { Row, Col } from 'antd'
import './minh.css'

function DoubleRowTask() {
    if (global.CurrentUser.TasksList.length===0){
        global.CurrentUser.get_tasks()
    }
    return (
    <Row className='content'>
        <Tasks name='tasks' fin/>
        {/* <Col flex={1}><Tasks name='tasks' fin/></Col> */}
        {/* <Col flex={1}><Tasks name='unfinished'/></Col> */}
    </Row>
    )
}

export default DoubleRowTask
