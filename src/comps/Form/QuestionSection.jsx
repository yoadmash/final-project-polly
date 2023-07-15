import React, { useState } from 'react';
import { Row, Col, FormGroup, Input } from 'reactstrap';
import DropDownOptions from './Functions/DropDownFunc';
import './CSS/Form.css';
import FormInputs from './FormInputs';
// import RenderInputs from './FormInputs';

export default function QuestionSection() {
    const [optionType, setOptionType] = useState('radio');

    const typeSelected = (type) => {
        setOptionType(type);
    }

    return (

        <Row className="form_questions">
            {/**************** Question inputs ****************/}
            <Col className='col-8'>
                <div className='question_div'>
                    <Row>
                        <input className="question_input" type="text" name="question" placeholder="Question..." id="" /></Row>
                    <Row>
                        {/* Function that adds an option and change the option type according to the dropdown list:*/}
                        <FormInputs id={1} type={optionType} />
                    </Row>
                </div>
            </Col>

            {/************ Question option ************/}
            <Col>
                <Row>  <h6 className='text-center' style={{ fontWeight: 600, paddingTop: 10 }}>Question Options</h6></Row>
                <Row>
                    <DropDownOptions typeSelected={typeSelected} />
                </Row>
                <Row className=''>
                    <Col className=' col-8'>
                        <p style={{ margin: '0' }}>Required Question</p>
                    </Col>
                    <Col className=''>
                        <FormGroup switch>
                            <Input type="switch" role="switch" />
                        </FormGroup>
                    </Col>
                </Row>
                <Row className=''>
                    <Col className=' col-8'>
                        <p style={{ margin: '0' }}>Shuffle Order</p>
                    </Col>
                    <Col className=''>
                        <FormGroup switch>
                            <Input type="switch" role="switch" />
                        </FormGroup>                  </Col>
                </Row>
                <Row className=''>
                    <Col className=' col-8'>
                        <p style={{ margin: '0' }}>Shuffle Order</p>
                    </Col>
                    <Col className=''>
                        <FormGroup switch>
                            <Input type="switch" role="switch" />
                        </FormGroup>                  </Col>
                </Row>
            </Col>
        </Row>

    )
}