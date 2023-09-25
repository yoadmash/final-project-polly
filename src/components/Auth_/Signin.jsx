import './Authentication.css'
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Form, FormGroup, Input, Label, Button, Spinner } from 'reactstrap';
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from '../../api/axios';
import useAuth from '../../hooks/useAuth';

const LOGIN_URL = '/users/auth/login';

export default function Signin() {
    const [isLoading, setIsLoading] = useState(false);
    const { setAuth, persist, setPersist } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || '/';

    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [errMsg, setErrMsg] = useState('');

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
            const { userId, fullname, accessToken, profile_pic_path } = response?.data?.userData;
            setAuth({ userId, username, fullname, accessToken, profile_pic_path });
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
        <Form onSubmit={handleSubmit}>
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

                <Input type="password"
                    className="input-fields-css"
                    id="password" name="password"
                    placeholder='Password'
                    onChange={(e) => setPassword(e.target.value)}
                />

                <FormGroup check>
                    <Label check for='remember-me'>
                        <Input
                            id='remember-me'
                            type="checkbox"
                            checked={persist}
                            onChange={() => setPersist(prevState => !prevState)}
                        />Remember Me
                    </Label>
                </FormGroup>
                
                <Button type='submit' className='buttons-fields-css' disabled={isLoading}>
                    {!isLoading ? 'Login' : <Spinner size={'sm'} />}
                </Button>
            </FormGroup>
        </Form>
    )
}
