import './Authentication.css'
import { faInfoCircle, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Form, FormGroup, Input, InputGroup, InputGroupText, Label, Button, Spinner } from 'reactstrap';
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from '../../api/axios';
import useAuth from '../../hooks/useAuth';

const LOGIN_URL = '/users/auth/login';

export default function Signin() {
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || '/';

    const [isLoading, setIsLoading] = useState(false);
    const { setAuth, persist, setPersist } = useAuth();

    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [errMsg, setErrMsg] = useState('');

    const [showPassword, setShowPassword] = useState(false);

    useEffect(() => {
        setErrMsg('');
    }, [username, password]);

    useEffect(() => {
        localStorage.setItem('persist', persist);
    }, [persist]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!username || !password) {
            setErrMsg('Missing username or password');
            return;
        }

        try {
            setIsLoading(true);
            const response = await axios.post(LOGIN_URL,
                JSON.stringify({ username: username, password: password }), {
                headers: { "Content-Type": "application/json" },
                withCredentials: true
            });
            const { userId, fullname, accessToken, admin, profile_pic_path } = response?.data?.userData;
            setAuth({ userId, username, fullname, accessToken, admin, profile_pic_path });
            navigate(from, { replace: true });
        } catch (err) {
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else if (err.response?.status) {
                setErrMsg(`${err.response.data.message}`);
            } else {
                setErrMsg('Login Failed!');
            }
            setIsLoading(false);
        }
    }

    return (
        <Form onSubmit={handleSubmit} autoComplete={'off'}>
            <p className={errMsg ? "errMsg" : "hidden"}>
                <FontAwesomeIcon icon={faInfoCircle} />
                {errMsg}
            </p>
            <FormGroup className='form-css'>
                <Input
                    type="text"
                    className="input-fields-css"
                    id="username" name="username"
                    placeholder='Username'
                    onChange={(e) => setUserName(e.target.value)}
                />

                <InputGroup>
                    <Input
                        addon
                        type={showPassword ? "text" : "password"}
                        className="input-fields-css"
                        id="password" name="password"
                        placeholder='Password'
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <InputGroupText style={{ backgroundColor: 'rgba(141, 232, 232, 0.338)' }}>
                        <Input id='show-hide-password' type='checkbox' hidden onChange={() => setShowPassword(!showPassword)} />
                        <Label check className='d-flex show-hide-password' for='show-hide-password'>
                            <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                        </Label>
                    </InputGroupText>
                </InputGroup>

                <FormGroup check>
                    <Label check for='remember-me'>
                        <Input
                            id='remember-me'
                            type="checkbox"
                            checked={persist}
                            onChange={() => setPersist(prevState => !prevState)}
                        />Remember me
                    </Label>
                </FormGroup>

                <Button type='submit' className='buttons-fields-css' disabled={isLoading}>
                    {!isLoading ? 'Login' : <Spinner size={'sm'} />}
                </Button>
            </FormGroup>
        </Form>
    )
}
