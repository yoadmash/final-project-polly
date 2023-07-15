import React from 'react'
import './Authentication.css'
import {
    Form,
    FormGroup,
    Input,
} from 'reactstrap';

export default function Signup() {
    return (
        <Form>
            <FormGroup className='form-css'>
                <Input type="text" className="input-fields-css" id="firstName" name="firstname" placeholder='First Name' />
                <Input type="text" className="input-fields-css" id="lastName" name="lastName" placeholder='Last Name' />
                <Input type="email" className="input-fields-css" id="email" name="email" placeholder='Email Address' />
                <Input type="password" className="input-fields-css" id="password" name="password" placeholder='Password' />
                <Input type="submit" className="buttons-fields-css" value="Sign Up" />
            </FormGroup>
        </Form>
    )
}
