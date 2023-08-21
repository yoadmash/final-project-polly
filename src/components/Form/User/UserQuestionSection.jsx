import React, { useState } from 'react';
import { Row, Col, FormGroup, Input } from 'reactstrap';
import './CSS/UserForm.css';
import UserSelection from "./UserSelection";


export default function QuestionSection() {
    return (

        <Row >
            {/**************** Question inputs ****************/}
            <Col style={{ padding: '30px' }}>
                <Row>
                    <Row className='question-title'>
                        *title*
                    </Row>
                    <Row className='question-title'>
                        *answers*
                    </Row>
                </Row>
                <Row style={{ padding: '30px' }}>
                    <UserSelection />
                </Row>

            </Col>
        </Row>



    )
}