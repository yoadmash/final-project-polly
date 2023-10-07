import { useContext } from "react";
import PollContext from "../contexts/PollProvider";

const usePoll = () => {
    return useContext(PollContext);
}

export default usePoll;