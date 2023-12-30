import './Authentication.css'
import React, { useState, useEffect } from 'react';
import { Form, FormGroup, Input, Label, Button, Spinner } from 'reactstrap';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from '../../api/axios';

const EMAIL_REGEX = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;

const ForgotPassword = () => {

    const [isLoading, setIsLoading] = useState(false);

    const [email, setEmail] = useState('');
    const [validEmail, setValidEmail] = useState(false);

    const [errMsg, setErrMsg] = useState('');
    const [emailSent, setEmailSent] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validEmail) return setErrMsg('Invalid email address');
        try {
            setIsLoading(true);
            await axios.post('users/auth/reset-password', { emailAddress: email });
            setEmailSent(true);
        } catch (err) {
            setErrMsg(err?.response?.data?.message);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        setValidEmail(EMAIL_REGEX.test(email));
        if (errMsg.length > 0) {
            setErrMsg('');
        }
        // eslint-disable-next-line
    }, [email]);

    return (
        <>
            {
                emailSent
                    ?
                    <div className="authComplete">
                        <p>A reset password link has been sent to: {email}</p>
                        <p>Follow the link in order to reset your password</p>
                    </div>
                    :
                    <Form autoComplete='off' onSubmit={(e) => handleSubmit(e)}>
                        <p className={errMsg ? "errMsg" : "hidden"}>
                            <FontAwesomeIcon icon={faInfoCircle} />
                            {errMsg}
                        </p>
                        <FormGroup className='form-css'>
                            <Label check for='email'>
                                <Input
                                    type="text"
                                    className="input-fields-css"
                                    id="email" name="email"
                                    placeholder='Email'
                                    valid={validEmail}
                                    invalid={(email.length > 0 && validEmail === false)}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </Label>

                            <Button type='submit' className='buttons-fields-css' disabled={isLoading}>
                                {!isLoading ? 'Submit' : <Spinner size={'sm'} />}
                            </Button>
                        </FormGroup>
                    </Form>
            }
        </>
    )
}

export default ForgotPassword