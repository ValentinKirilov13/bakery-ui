import {useContext} from "react";
import UserContext from "../contexts/user-context/UserContext";

export default function useUserContext() {
    return useContext(UserContext);
}
