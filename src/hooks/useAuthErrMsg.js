import { useContext } from "react";
import AuthErrMsgContext from "../contexts/AuthErrMsgProvider";

const useAuthErrMsg = () => {
    return useContext(AuthErrMsgContext);
}

export default useAuthErrMsg;