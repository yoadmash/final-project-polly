import React, { useState } from 'react';
import { Row, Col, FormGroup, Input } from 'reactstrap';
import './CSS/UserForm.css';
import UserSelection from "./UserSelection";


export default function QuestionSection() {
    return (

        <Row >
            {/**************** Question inputs ****************/}
            <Col className>
                <div className='question_div'>
                    <Row className='question_input'>
                        <h5>lorem ipsum dlor alex hahomo?</h5>
                    </Row>

                    <Row className='inputs-row'>
                        {/* Function that adds an option and change the option type according to the dropdown list:*/}
                        <UserSelection />
                    </Row>
                </div>
            </Col>
        </Row>

    )
}