import React from 'react'
import './Authentication.css'
import {
    Form,
    FormGroup,
    Input,
} from 'reactstrap';

export default function Signin() {
    return (
        <Form>
            <FormGroup className='form-css'>
                <Input type="email" className="input-fields-css" id="email" name="email" placeholder='Email Address' />
                <Input type="password" className="input-fields-css" id="password" name="password" placeholder='Password' />
                <Input type="submit" className="buttons-fields-css" value="Login" />
            </FormGroup>
        </Form>

    )
}
