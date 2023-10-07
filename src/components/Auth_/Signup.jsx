import './Authentication.css'
import { Form, FormGroup, Input, Button, Spinner } from 'reactstrap';
import { useState, useEffect } from 'react';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from '../../api/axios';

const REGISTER_URL = '/users/auth/register';

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*]).{8,24}$/;
const EMAIL_REGEX = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;

export default function Signup() {
    const [isLoading, setIsLoading] = useState(false);

    const [firstname, setFirstName] = useState('');
    const [lastname, setLastName] = useState('');

    const [username, setUserName] = useState('');
    const [validUserName, setValidUserName] = useState(false);
    const [userNameFocus, setUserNameFocus] = useState(false);

    const [email, setEmail] = useState('');
    const [validEmail, setValidEmail] = useState(false);

    const [password, setPassword] = useState('');
    const [validPassword, setValidPassword] = useState(false);
    const [passwordFocus, setPasswordFocus] = useState(false);

    const [matchPassword, setMatchPassword] = useState('');
    const [validMatchPassword, setValidMatchPassword] = useState(false);
    const [matchPasswordFocus, setMatchPasswordFocus] = useState(false);

    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);
    const [successMsg, setSuccessMsg] = useState('');

    useEffect(() => {
        setValidUserName(USER_REGEX.test(username));
    }, [username]);

    useEffect(() => {
        setValidEmail(EMAIL_REGEX.test(email));
    }, [email]);

    useEffect(() => {
        setValidPassword(PWD_REGEX.test(password));
        setValidMatchPassword(password === matchPassword);
    }, [password, matchPassword]);

    useEffect(() => {
        setErrMsg('');
    }, [username, password, matchPassword, firstname, lastname]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const v1 = USER_REGEX.test(username);
        const v2 = PWD_REGEX.test(password);
        const v3 = EMAIL_REGEX.test(email);
        if (!v1 || !v2 || !v3 || !validMatchPassword || !firstname || !lastname) {
            setErrMsg("Please fill the form correctly");
            return;
        }

        const newUser = {
            firstname: firstname,
            lastname: lastname,
            email: email,
            username: username,
            password: password,
        }

        try {
            setIsLoading(true);
            const response = await axios.post(REGISTER_URL,
                JSON.stringify(newUser), {
                headers: { "Content-Type": "application/json" },
                withCredentials: true
            });
            if (response.status === 201) {
                setSuccessMsg('Registration Complete');
            } else if (response.status === 200) {
                setSuccessMsg('Your user has been activated');
            }
            setSuccess(true);
        } catch (err) {
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else if (err.response?.status) {
                setErrMsg(`${err.response.data.message}`);
            } else {
                setErrMsg('Registration Failed!');
            }
            setIsLoading(false);
        }
    }

    return (
        <>
            {success
                ?
                <div className="authComplete">
                    <p>{successMsg}</p>
                    <p>You can sign in now</p>
                </div>
                :
                <Form onSubmit={handleSubmit} autoComplete={'off'}>
                    <p className={errMsg ? "errMsg" : "hidden"}>
                        <FontAwesomeIcon icon={faInfoCircle} />
                        {errMsg}
                    </p>
                    <FormGroup className='form-css'>
                        <Input
                            type="text"
                            className="input-fields-css"
                            id="firstName" name="firstname"
                            placeholder='First Name'
                            valid={firstname.length > 0}
                            onChange={(e) => setFirstName(e.target.value)}
                        />
                        <Input
                            autoComplete={false}
                            type="text"
                            className="input-fields-css"
                            id="lastName" name="lastname"
                            placeholder='Last Name'
                            valid={lastname.length > 0}
                            onChange={(e) => setLastName(e.target.value)}
                        />

                        <Input
                            type="text"
                            className="input-fields-css"
                            id="username"
                            name="username"
                            placeholder='Username'
                            valid={validUserName}
                            invalid={(username.length > 0 && validUserName === false)}
                            onChange={(e) => setUserName(e.target.value)}
                            onFocus={() => setUserNameFocus(true)}
                            onBlur={() => setUserNameFocus(false)}
                        />
                        <p className={userNameFocus && username && !validUserName ? "instructions" : 'hidden'}>
                            <FontAwesomeIcon icon={faInfoCircle} />
                            4 to 24 characters.<br />
                            Must begin with a letter.<br />
                            Letters, numbers, underscores and hyphens are allowed.
                        </p>

                        <Input
                            type="email"
                            className="input-fields-css"
                            id="email" name="email"
                            placeholder='Email Address'
                            valid={validEmail}
                            invalid={(email.length > 0 && validEmail === false)}
                            onChange={(e) => setEmail(e.target.value)}
                        />

                        <Input type="password"
                            className="input-fields-css"
                            id="password" name="password"
                            placeholder='Password'
                            valid={(password.length > 0 && validPassword)}
                            invalid={(password.length > 0 && validPassword === false)}
                            onChange={(e) => setPassword(e.target.value)}
                            onFocus={() => setPasswordFocus(true)}
                            onBlur={() => setPasswordFocus(false)}
                        />
                        <p className={(passwordFocus) && password && !validPassword ? "instructions" : "hidden"}>
                            <FontAwesomeIcon icon={faInfoCircle} />
                            8 to 24 characters.<br />
                            Must include uppercase and lowercase letters, a number and a special character.<br />
                            Allowed special characters: ! @ # $ % ^ & *
                        </p>

                        <Input type="password"
                            className="input-fields-css"
                            id="confirm_password" name="confirm_password"
                            placeholder='Confirm Password'
                            valid={(matchPassword.length > 0 && validMatchPassword)}
                            invalid={(matchPassword.length > 0 && validMatchPassword === false)}
                            onChange={(e) => setMatchPassword(e.target.value)}
                            onFocus={() => setMatchPasswordFocus(true)}
                            onBlur={() => setMatchPasswordFocus(false)}
                        />
                        <p className={matchPasswordFocus && matchPassword && !validMatchPassword ? "instructions" : "hidden"}>
                            <FontAwesomeIcon icon={faInfoCircle} />
                            Password mismatch
                        </p>

                        <Button type='submit' className='buttons-fields-css' disabled={isLoading}>
                            {!isLoading ? 'Register' : <Spinner size={'sm'} />}
                        </Button>
                    </FormGroup>
                </Form>
            }
        </>
    )
}
