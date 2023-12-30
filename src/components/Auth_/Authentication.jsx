import './Authentication.css'
import React, { useState, } from 'react';
import { Input, Label } from 'reactstrap';
import Signin from './Signin';
import Signup from './Signup';
import ForgotPassword from './ForgotPassword';


export default function Auth() {

    const authOptions = [
        { name: 'Sign in', element: <Signin /> },
        { name: 'Sign up', element: <Signup /> },
        { name: 'Forgot password', element: <ForgotPassword /> },
    ]

    const [selectedOption, setSelectedOption] = useState(0);
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
                {authOptions[selectedOption]?.element}
            </div>
        </div>
    )
}
