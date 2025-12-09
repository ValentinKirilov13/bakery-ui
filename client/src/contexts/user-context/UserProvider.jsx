import UserContext from "./UserContext";
import useRequest from "../../hooks/useRequest";
import usePersistedState from "../../hooks/usePersistedState";

/**
 * Provider component for `UserContext`.
 *
 * Wrap your app (or part of it) with `UserProvider` to provide
 * authentication state and actions to child components.
 *
 * @param {Object} props - React props.
 * @param {React.ReactNode} props.children - Child components to render.
 *
 * @returns {JSX.Element} The `UserContext.Provider` wrapping `children`.
 *
 * @example
 * <UserProvider>
 *   <App />
 * </UserProvider>
 */
export default function UserProvider({children}) {
    const [user, setUser] = usePersistedState(null, "auth");
    const {request} = useRequest();

    /**
     * Registers a new user and creates an empty cart for them.
     *
     * @param {string} email - User's email.
     * @param {string} password - User's password.
     */
    const registerHandler = async (email, password) => {
        const result = await request("/users/register", "POST", {
            email,
            password,
        });

        const cartResult = await request(
            `/data/carts`,
            "POST",
            {
                products: [],
            },
            {
                accessToken: result.accessToken,
            }
        );

        setUser({...result, _cartId: cartResult._id});
    };

    /**
     * Logs in a user and fetches their cart.
     *
     * @param {string} email - User's email.
     * @param {string} password - User's password.
     */
    const loginHandler = async (email, password) => {
        const result = await request("/users/login", "POST", {
            email,
            password,
        });

        const params = new URLSearchParams({
            where: `_ownerId="${result._id}"`,
            pageSize: "1",
        });

        const cartResult = await request(`/data/carts?${params.toString()}`);

        setUser({...result, _cartId: cartResult?.[0]?._id});
    };

    /**
     * Logs out the current user and clears the persisted state.
     */
    const logoutHandler = async () => {
        await request("/users/logout", null, null, {
            accessToken: user.accessToken,
        });

        setUser(null);
    };

    const isAuthenticated = !!user?.accessToken;

    /** Values provided to the UserContext */
    const contextValues = {
        user,
        isAuthenticated,
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
