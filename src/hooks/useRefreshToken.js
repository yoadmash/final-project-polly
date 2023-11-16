import axios from "../api/axios";
import useAuth from "./useAuth";
import { useNavigate } from 'react-router-dom';

const useRefreshToken = () => {
    const { setAuth } = useAuth();
    const navigate = useNavigate();

    const refresh = async () => {
        try {
            const response = await axios.get('/users/auth/refresh', {
                withCredentials: true
            });
            const { userId, username, fullname, accessToken, profile_pic_path } = response?.data?.userData;
            setAuth({ userId, username, fullname, accessToken, profile_pic_path });
            return response.data.accessToken;
        } catch {
            navigate('/auth');
        }
    }

    return refresh;
}

export default useRefreshToken