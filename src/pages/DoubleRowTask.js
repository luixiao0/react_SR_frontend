import React from 'react'
import Tasks from './Tasks.js'
// import { Row, Col } from 'antd'
import { Row } from 'antd'
import './minh.css'

function DoubleRowTask() {
    // if (global.CurrentUser.TasksList.length===0){
    //     global.CurrentUser.get_tasks()
    // }
    return (
    <Row className='content'>
        <Tasks name='tasks'/>
    </Row>
    )
}

export default DoubleRowTask
