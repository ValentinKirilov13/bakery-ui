import {createContext} from "react";

/**
 * Shape of the User object in the UserContext.
 *
 * @typedef {Object} User
 * @property {string} email - User's email.
 * @property {string} password - User's password (usually hashed).
 * @property {number} _createdOn - Timestamp when the user was created.
 * @property {string} _id - Unique user ID.
 * @property {string} _cartId - ID of the user's cart.
 * @property {string} accessToken - JWT or access token for authentication.
 */

/**
 * Shape of the UserContext.
 *
 * @typedef {Object} UserContextType
 * @property {boolean} isAuthenticated - Whether the user is currently authenticated.
 * @property {User} user - Current user data.
 * @property {() => Promise<void>} registerHandler - Function to register a new user.
 * @property {() => Promise<void>} loginHandler - Function to log in a user.
 * @property {() => Promise<void>} logoutHandler - Function to log out the user.
 */

/**
 * React context to provide user authentication state and actions.
 *
 * Default values are provided for development / initial state.
 *
 * @type {React.Context<UserContextType>}
 */
const UserContext = createContext({
    isAuthenticated: false,
    user: {
        email: "",
        password: "",
        _createdOn: 0,
        _id: "",
        _cartId: "",
        accessToken: "",
    },
    registerHandler: async () => {},
    loginHandler: async () => {},
    logoutHandler: async () => {},
});

export default UserContext;
