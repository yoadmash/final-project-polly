import React, { useState } from "react";
import { Row, Col, Input, FormGroup, Label } from 'reactstrap';
import "./CSS/Form.css";


export default function FormInputs({ id, type }) {

    return (
        <div className="input-div">
            <Input id={id} type={type} disabled placeholder={type === 'text' && 'Add answer'} />
            {type!=='text' && <Input type='text'/>}
        </div>
    )
}

