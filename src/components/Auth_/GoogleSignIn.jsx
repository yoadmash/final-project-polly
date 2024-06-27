import GoogleButton from 'react-google-signin-button';
import 'react-google-signin-button/dist/button.css';

import { signInWithPopup } from 'firebase/auth';
import { firebaseAuth, provider } from '../../api/firebaseConfig.js';

import Chance from "chance";

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth.js';
import useAuthErrMsg from '../../hooks/useAuthErrMsg';
import axios from '../../api/axios';

const GoogleSignIn = () => {

    const chance = new Chance();
    const GOOGLE_AUTH_URL = '/users/auth/google';

    const { setAuth } = useAuth();
    const { setAuthErrMsg } = useAuthErrMsg()
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);

    const googleAuth = async (userData) => {
        try {
            const response = await axios.post(GOOGLE_AUTH_URL, {
                firstname: userData.firstName,
                lastname: userData.lastName,
                email: userData.email,
                username: chance.word({ length: 8 }),
            }, {
                headers: { "Content-Type": "application/json" },
                withCredentials: true
            });

            const { userId, username, fullname, accessToken, admin, profile_pic_path, polls_created, registered_by_google } = response?.data?.userData;
            setAuth({ userId, username, fullname, accessToken, admin, profile_pic_path, polls_created, registered_by_google });
            navigate('/', { replace: true });

        } catch (err) {
            setAuthErrMsg(err?.response?.data?.message);
        } finally {
            setLoading(false);
        }
    }

    const handleSignInWithGoogleRedirect = async (event) => {
        event.preventDefault();
        try {
            setLoading(true);
            const res = await signInWithPopup(firebaseAuth, provider);
            await googleAuth(res._tokenResponse);
        } catch (err) {
            if (err.message === 'Firebase: Error (auth/popup-closed-by-user).') {
                err.message = 'Auth popup closed by user'
            }
            setAuthErrMsg(err.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <GoogleButton disabled={loading} label={(loading) ? 'Loading...' : 'Continue with Google'} shape='pill' onClick={(e) => handleSignInWithGoogleRedirect(e)} />
    )
}

export default GoogleSignIn