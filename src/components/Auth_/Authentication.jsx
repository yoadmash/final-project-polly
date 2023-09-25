import './Authentication.css'
import React, { useState, } from 'react';
import { Input, Label } from 'reactstrap';
import Signin from './Signin';
import Signup from './Signup';


export default function Auth() {

    const [isSignIn, setSelectedOption] = useState(true);
    const handleChange = () => {
        setSelectedOption(prevState => !prevState);
    };


    return (
        <div>
            <div className='header-Auth '>
                <img className="logo-login" src="/Polly_logo.svg" alt="" />
            </div>

            <div className='body-auth'>
                <div className='body-auth-radio-buttons '>
                    <Label>
                        <Input
                            type='radio'
                            value='signin'
                            checked={isSignIn === true}
                            onChange={handleChange}
                        />
                        Sign In
                    </Label>

                    <Label>
                        <Input
                            type='radio'
                            value='signin'
                            checked={isSignIn === false}
                            onChange={handleChange}
                        />
                        Sign Up
                    </Label>
                </div>
                {isSignIn ? <Signin /> : <Signup />}
            </div>
        </div>
    )
}
