import {createContext} from "react";

const UserContext = createContext({
    isAuthenticated: false,
    user: {
        _id: "",
        email: "",
        accessToken: "",
    },
    registerHandler() {},
    loginHandler() {},
    logoutHandler() {},
});

export default UserContext;
