import useAuth from "./useAuth";
import useAxiosPrivate from "./useAxiosPrivate";

const useLogout = () => {
    const { setAuth } = useAuth();
    const axiosPrivate = useAxiosPrivate();

    const logout = async () => {
        setAuth({});
        try {
            await axiosPrivate.get('/users/auth/logout');
        } catch (err) {
            console.log(err);
        }
    }

    return logout;
}

export default useLogout;