import './Authentication.css';
import { useState, useEffect } from 'react';
import { faInfoCircle, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Form, FormGroup, Input, InputGroup, InputGroupText, Label, Button, Spinner } from 'reactstrap';
import { Link, useSearchParams } from 'react-router-dom';
import axios from '../../api/axios';

const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*]).{8,24}$/;

const ResetPasswordForm = () => {
    const [searchParams] = useSearchParams();

    const [isLoading, setIsLoading] = useState(false);

    const [password, setPassword] = useState('');
    const [validPassword, setValidPassword] = useState(false);
    const [passwordFocus, setPasswordFocus] = useState(false);

    const [matchPassword, setMatchPassword] = useState('');
    const [validMatchPassword, setValidMatchPassword] = useState(false);
    const [matchPasswordFocus, setMatchPasswordFocus] = useState(false);

    const [showPassword, setShowPassword] = useState(false);
    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);
    const [successMsg, setSuccessMsg] = useState('');

    useEffect(() => {
        setErrMsg('');
        setValidPassword(PWD_REGEX.test(password));
        setValidMatchPassword(password === matchPassword);
    }, [password, matchPassword]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const searchParamsObj = Object.fromEntries(searchParams);

        if (searchParamsObj?.t) {
            if (validPassword && validMatchPassword) {
                try {
                    setIsLoading(true);
                    const response = await axios.post('/users/auth/change-password', {
                        resetPassToken: searchParamsObj?.t,
                        password,
                        matchPassword
                    })
                    setSuccess(true);
                    setSuccessMsg(response.data.message);
                } catch (err) {
                    setErrMsg(err.response.data.message);
                } finally {
                    setIsLoading(false);
                }
            } else {
                setErrMsg('Missing password');
            }
        } else {
            setErrMsg('Invalid link');
        }
    }

    return (
        <>
            <div className='header-Auth '>
                <img className="logo-login" src="/Polly_logo.svg" alt="" />
            </div>

            {success
                ?
                <div className="authComplete">
                    <p>{successMsg}</p>
                    <p>You can <Link to={'/auth'}>sign in</Link> now</p>
                    
                </div>
                :
                <>
                    <div className='body-auth'>
                        <Form autoComplete={'off'} onSubmit={(e) => handleSubmit(e)}>
                            <p className={errMsg ? "errMsg" : "hidden"}>
                                <FontAwesomeIcon icon={faInfoCircle} />
                                {errMsg}
                            </p>
                            <FormGroup className='form-css'>

                                <Input
                                    addon
                                    type={showPassword ? "text" : "password"}
                                    className="input-fields-css"
                                    id="password" name="password"
                                    placeholder='New password'
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

                                <InputGroup>
                                    <Input
                                        addon
                                        type={showPassword ? "text" : "password"}
                                        className="input-fields-css"
                                        id="confirm_password" name="confirm_password"
                                        placeholder='Confirm new password'
                                        valid={(matchPassword.length > 0 && validMatchPassword)}
                                        invalid={(matchPassword.length > 0 && validMatchPassword === false)}
                                        onChange={(e) => setMatchPassword(e.target.value)}
                                        onFocus={() => setMatchPasswordFocus(true)}
                                        onBlur={() => setMatchPasswordFocus(false)}
                                    />
                                    <InputGroupText style={{ backgroundColor: 'rgba(141, 232, 232, 0.338)' }}>
                                        <Input id='show-hide-password' type='checkbox' hidden onChange={() => setShowPassword(!showPassword)} />
                                        <Label check className='d-flex show-hide-password' for='show-hide-password'>
                                            <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                                        </Label>
                                    </InputGroupText>
                                </InputGroup>

                                <p className={matchPasswordFocus && matchPassword && !validMatchPassword ? "instructions" : "hidden"}>
                                    <FontAwesomeIcon icon={faInfoCircle} />
                                    Password mismatch
                                </p>

                                <Button type='submit' className='buttons-fields-css' disabled={isLoading}>
                                    {!isLoading ? 'Change' : <Spinner size={'sm'} />}
                                </Button>
                            </FormGroup>
                        </Form>
                    </div>
                </>
            }
        </>
    )
}

export default ResetPasswordForm