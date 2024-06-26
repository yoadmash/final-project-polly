import './Authentication.css'
import React, { useState, } from 'react';
import { Input, Label } from 'reactstrap';
import Signin from './Signin';
import Signup from './Signup';
import ForgotPassword from './ForgotPassword';
import GoogleSignIn from './GoogleSignIn';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import useAuthErrMsg from '../../hooks/useAuthErrMsg';


export default function Auth() {

    const authOptions = [
        { name: 'Sign in', element: <Signin /> },
        { name: 'Sign up', element: <Signup /> },
        { name: 'Forgot password', element: <ForgotPassword /> },
    ]

    const [selectedOption, setSelectedOption] = useState(0);
    const { authErrMsg } = useAuthErrMsg();

    const handleChange = (option) => {
        setSelectedOption(option);
    };

    return (
        <div>
            <div className='header-Auth '>
                <img className="logo-login" src="/Polly_logo.svg" alt="" />
            </div>

            <div className='body-auth'>
                <div className='body-auth-radio-buttons '>
                    {authOptions.map((ap, index) => (
                        <Label key={ap.name}>
                            <Input
                                type='radio'
                                checked={selectedOption === index}
                                onChange={() => handleChange(index)}
                            />
                            {ap.name}
                        </Label>
                    ))}
                </div>
                {authErrMsg?.length > 0 && <p className={'errMsg'}>
                    <FontAwesomeIcon icon={faInfoCircle} /> {authErrMsg}
                </p>}
                {authOptions[selectedOption]?.element}
                {(selectedOption === 0 || selectedOption === 1) &&
                    <div className='d-flex flex-column align-items-center gap-3'>
                        <span>or</span>
                        <GoogleSignIn />
                    </div>
                }
            </div>
        </div>
    )
}
