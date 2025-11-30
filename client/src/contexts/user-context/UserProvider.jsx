import {useState} from "react";
import UserContext from "./UserContext";
import useRequest from "../../hooks/useRequest";

export default function UserProvider({children}) {
    const [user, setUser] = useState(null);
    const {request} = useRequest();

    const registerHandler = async (email, password) => {
        const result = await request("/users/register", "POST", {
            email,
            password,
        });

        setUser(result);
    };

    const loginHandler = ({email, password}) => {};
    const logoutHandler = () => {};

    const contextValues = {
        user,
        registerHandler,
        loginHandler,
        logoutHandler,
    };

    return (
        <UserContext.Provider value={contextValues}>
            {children}
        </UserContext.Provider>
    );
}
