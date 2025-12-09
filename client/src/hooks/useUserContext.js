import {useContext} from "react";
import UserContext from "../contexts/user-context/UserContext";

/**
 * Custom hook to access the current user context.
 *
 * @returns {UserContextType} The context object containing
 * the current user info and authentication handlers.
 *
 * @example
 * const { isAuthenticated, user, loginHandler, logoutHandler } = useUserContext();
 */
export default function useUserContext() {
    return useContext(UserContext);
}
