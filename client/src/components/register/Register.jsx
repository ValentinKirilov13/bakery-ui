import {Link, useLocation, useNavigate} from "react-router";
import useForm from "../../hooks/useForm";
import useUserContext from "../../hooks/useUserContext";
import {toast} from "react-toastify";
import Logo from "../logo/Logo";
import Spinner from "../page-spinner/spinner/Spinner";

export default function Register() {
    const {registerHandler} = useUserContext();
    const navigate = useNavigate();
    const {state} = useLocation();
    const from = state?.from?.pathname || "/";
    const {
        errors,
        touched,
        loading,
        submittingHandler,
        registerInput,
        formAction,
    } = useForm(
        {
            email: "",
            password: "",
            confirmPassword: "",
        },
        async ({email, password}) => {
            try {
                await registerHandler(email, password);
                toast.success("Registration successful! Welcome!");
                navigate(from, {replace: true});
            } catch (err) {
                toast.error(err?.message);
            }
        },
        ({email, password, confirmPassword}) => {
            const newErrors = {};

            if (!email?.trim()) {
                newErrors.email = "Email is required.";
            } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                newErrors.email = "Enter a valid email address.";
            }

            if (!password?.trim()) {
                newErrors.password = "Password is required.";
            } else if (password.length < 6) {
                newErrors.password = "Password must be at least 6 characters.";
            }

            if (!confirmPassword?.trim()) {
                newErrors.confirmPassword = "Please confirm your password.";
            } else if (confirmPassword !== password) {
                newErrors.confirmPassword = "Passwords do not match.";
            }

            return newErrors;
        }
    );

    return (
        <div className="grow flex flex-col justify-center p-9  bg-amber-100">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <Logo imgClassName="mx-auto h-40 w-auto rounded-4xl" />
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
                                autoComplete="email"
                                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-amber-900 outline-1 -outline-offset-1 outline-amber-900 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-amber-500 sm:text-sm/6"
                            />
                            {touched.email && errors.email && (
                                <p className="text-red-500 text-sm font-semibold">
                                    {errors.email}
                                </p>
                            )}
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
                                autoComplete="current-password"
                                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-amber-900 outline-1 -outline-offset-1 outline-amber-900 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-amber-500 sm:text-sm/6"
                            />
                            {touched.password && errors.password && (
                                <p className="text-red-500 text-sm font-semibold">
                                    {errors.password}
                                </p>
                            )}
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
                                autoComplete="current-password"
                                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-amber-900 outline-1 -outline-offset-1 outline-amber-900 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-amber-500 sm:text-sm/6"
                            />
                            {touched.confirmPassword &&
                                errors.confirmPassword && (
                                    <p className="text-red-500 text-sm font-semibold">
                                        {errors.confirmPassword}
                                    </p>
                                )}
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            onClick={submittingHandler}
                            className="cursor-pointer w-full bg-amber-500 hover:bg-amber-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200"
                        >
                            {loading ? <Spinner /> : "Sign up"}
                        </button>
                    </div>
                </form>
                <div className="mt-10 text-center text-sm/6 text-gray-400">
                    <span>You already have an account?</span>
                    <Link
                        state={state}
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
