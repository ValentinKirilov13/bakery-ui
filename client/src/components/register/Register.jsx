import {Link, useLocation, useNavigate} from "react-router";
import useForm from "../../hooks/useForm";
import useUserContext from "../../hooks/useUserContext";

export default function Register() {
    const {registerHandler} = useUserContext();
    const navigate = useNavigate();
    const {state} = useLocation();
    const from = state?.from?.pathname || "/";
    const {registerInput, formAction} = useForm(
        {
            email: "",
            password: "",
            confirmPassword: "",
        },
        async ({email, password}) => {
            try {
                await registerHandler(email, password);

                navigate(from);
            } catch (error) {
                alert(error);
            }
        }
    );

    return (
        <div className="grow flex flex-col justify-center p-9  bg-amber-100">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <img
                    alt="Your Company"
                    src="/logo.svg"
                    className="mx-auto h-40 w-auto rounded-4xl"
                />
                <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-amber-900">
                    Sign up
                </h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form action={formAction} className="space-y-6">
                    <div>
                        <label
                            htmlFor="email"
                            className="block text-sm/6 font-medium text-amber-900"
                        >
                            Email address
                        </label>
                        <div className="mt-2">
                            <input
                                id="email"
                                {...registerInput("email")}
                                type="email"
                                required
                                autoComplete="email"
                                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-amber-900 outline-1 -outline-offset-1 outline-amber-900 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-amber-500 sm:text-sm/6"
                            />
                        </div>
                    </div>

                    <div>
                        <div className="flex items-center justify-between">
                            <label
                                htmlFor="password"
                                className="block text-sm/6 font-medium text-amber-900"
                            >
                                Password
                            </label>
                        </div>
                        <div className="mt-2">
                            <input
                                id="password"
                                {...registerInput("password")}
                                type="password"
                                required
                                autoComplete="current-password"
                                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-amber-900 outline-1 -outline-offset-1 outline-amber-900 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-amber-500 sm:text-sm/6"
                            />
                        </div>
                    </div>

                    <div>
                        <div className="flex items-center justify-between">
                            <label
                                htmlFor="confirm-password"
                                className="block text-sm/6 font-medium text-amber-900"
                            >
                                Confirm Password
                            </label>
                        </div>
                        <div className="mt-2">
                            <input
                                id="confirm-password"
                                {...registerInput("confirmPassword")}
                                type="password"
                                required
                                autoComplete="current-password"
                                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-amber-900 outline-1 -outline-offset-1 outline-amber-900 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-amber-500 sm:text-sm/6"
                            />
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="cursor-pointer w-full bg-amber-500 hover:bg-amber-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200"
                        >
                            Sign up
                        </button>
                    </div>
                </form>
                <div className="mt-10 text-center text-sm/6 text-gray-400">
                    <span>You already have an account?</span>
                    <Link
                        to="/login"
                        className="font-semibold text-amber-500 hover:text-amber-600 ml-2"
                    >
                        Sign in now
                    </Link>
                </div>
            </div>
        </div>
    );
}
