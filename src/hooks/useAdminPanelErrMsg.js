import { useContext } from "react";
import AdminPanelErrContext from "../contexts/AdminPanelErrProvider";

const useAdminPanelErrMsg = () => {
    return useContext(AdminPanelErrContext);
}

export default useAdminPanelErrMsg;