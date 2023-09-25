import axios from "../api/axios";
import useAuth from "./useAuth";

const useRefreshToken = () => {
    const { setAuth } = useAuth();

    const refresh = async () => {
        const response = await axios.get('/users/auth/refresh', {
            withCredentials: true
        });
        const { userId, username, fullname, accessToken, profile_pic_path } = response?.data?.userData;
        setAuth({ userId, username, fullname, accessToken, profile_pic_path });
        return response.data.accessToken;
    }

    return refresh;
}

export default useRefreshToken