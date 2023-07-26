import './Authentication.css'
import React, { useState, } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signin from './Signin';
import Signup from './Signup';


export default function Auth() {

    const [selectedOption, setSelectedOption] = useState('option1');
    const handleOptionChange = (event) => {
        setSelectedOption(event.target.value);
    };


    return (
        <div>
            <div className='header-Auth '>
                <img className="logo-login" src="/Polly_logo.svg" alt="" />
            </div>


            <Router>
                <div className='body-auth'>
                    <div className='body-auth-radio-buttons '>
                        <label>
                            <input
                                type="radio"
                                value="option1"
                                checked={selectedOption === 'option1'}
                                onChange={handleOptionChange}
                            />
                            Sign In
                        </label>

                        <label>
                            <input
                                type="radio"
                                value="option2"
                                checked={selectedOption === 'option2'}
                                onChange={handleOptionChange}
                            />
                            Sign Up
                        </label>
                    </div>


                    <div>
                        <Routes>
                            <Route
                                path="/"
                                element={
                                    selectedOption === 'option1' ? <Signin /> : <Signup />
                                }
                            />
                        </Routes>
                    </div>
                </div>
            </Router>


        </div>
    )
}




function Option1Content() {
    return <h1>Option 1 Content</h1>;
}

function Option2Content() {
    return <h1>Option 2 Content</h1>;
}

