import React from 'react'
import { Input, Row, Col } from 'reactstrap'
import './CSS/UserForm.css'

export default function UserSelection() {
    return (
        <div>
            <Row className='bord'>
                <Row >
                    <Col className='col-1'><Input type='checkbox' /></Col>
                    <Col className='col-11'><p>$answer1</p></Col>
                </Row>
                <Row >
                    <Col className='col-1'><Input type='checkbox' /></Col>
                    <Col className='col-11'><p>$answer2</p></Col>
                </Row>
                <Row >
                    <Col className='col-1'><Input type='checkbox' /></Col>
                    <Col className='col-11'><p>$answer3</p></Col>
                </Row>
                <Row >
                    <Col className='col-1'><Input type='checkbox' /></Col>
                    <Col className='col-11'><p>$answer4</p></Col>
                </Row>
            </Row>

        </div>
    )
}
