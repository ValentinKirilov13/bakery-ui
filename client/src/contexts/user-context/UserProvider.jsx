import UserContext from "./UserContext";
import useRequest from "../../hooks/useRequest";
import {useNavigate} from "react-router";
import usePersistedState from "../../hooks/usePersistedState";

export default function UserProvider({children}) {
    const [user, setUser] = usePersistedState(null, "auth");
    const navigate = useNavigate();
    const {request} = useRequest();

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

    const loginHandler = async (email, password) => {
        const result = await request("/users/login", "POST", {
            email,
            password,
        });

        setUser(result);
    };

    const logoutHandler = async () => {
        await request("/users/logout", null, null, {
            accessToken: user.accessToken,
        });

        setUser(null);
        navigate("/");
    };

    const isAuthenticated = !!user?.accessToken;

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
