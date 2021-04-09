import React from 'react'
import Tasks from './Tasks'
import { Row, Col } from 'antd'

function DoubleRowTask() {
    return (          
    <Row className='row'>
        <Col flex={1}><Tasks name='finished' fin/></Col>
        <Col flex={1}><Tasks name='unfinished'/></Col>
    </Row>
    )
}

export default DoubleRowTask
