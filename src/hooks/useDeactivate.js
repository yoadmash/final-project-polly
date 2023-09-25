import axios from "../api/axios";
import useAuth from "./useAuth";

const useDeactivate = () => {
    const { auth, setAuth } = useAuth();

    const deactivate = async () => {
        try {
            await axios.post('/users/set_active?state=0', {}, {
                headers: {
                    Authorization: `Bearer ${auth.accessToken}`
                },
                withCredentials: true
            });
            setAuth({});
        } catch (err) {
            console.log(err);
        }
    }

    return deactivate;
}

export default useDeactivate;