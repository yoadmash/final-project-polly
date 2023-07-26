import React, { useState } from "react";
import { Row, Col, Input, FormGroup, Label } from 'reactstrap';
import "./CSS/AdminForm.css";


export default function FormInputs({ id, type }) {

    return (
        <div className="input-div">
            <Col className="col-3"><Input id={id} type={type} disabled placeholder={type === 'text' && 'Add answer'} />
            </Col>
            <Col className="col-5">
                {type !== 'text' && <Input type='text' />}
            </Col>
        </div>
    )
}

