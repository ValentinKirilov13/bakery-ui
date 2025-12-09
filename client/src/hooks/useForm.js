import {useState} from "react";

/**
 * Manages form state, validation, and submission logic.
 *
 * This hook provides:
 * - Controlled input values
 * - Field-level validation on blur
 * - Full-form validation on submit
 * - Tracking of touched fields
 *
 * @template TValues
 * @template TErrors
 *
 * @param {TValues} initialValues - Initial values for the form fields.
 * @param {(values: TValues) => Promise<void> | void} callback
 *        Function executed when the form is valid and submitted.
 * @param {(values: TValues) => TErrors}
 *        Validation function that returns an object mapping field names to error messages.
 *
 * @returns {{
 *   values: TValues,
 *   errors: TErrors,
 *   touched: Record<string, boolean>,
 *   registerInput: (inputName: keyof TValues) => {
 *     name: string,
 *     value: any,
 *     onChange: (e: import("react").ChangeEvent<HTMLInputElement>) => void,
 *     onBlur: (e: import("react").FocusEvent<HTMLInputElement>) => void
 *   },
 *   formAction: () => Promise<void>,
 *   changeHandler: (e: import("react").ChangeEvent<HTMLInputElement>) => void
 * }}
 *
 * @example
 * const {
 *   values,
 *   errors,
 *   touched,
 *   registerInput,
 *   formAction,
 * } = useForm(
 *   { email: "", password: "" },
 *   async (values) => login(values),
 *   (values) => {
 *     const errors = {};
 *     if (!values.email) errors.email = "Email is required";
 *     return errors;
 *   }
 * );
 */
export default function useForm(initialValues, callback, validateCallback) {
    const [values, setValues] = useState(initialValues);
    const [errors, setErrors] = useState({});
    const [touched, setTouched] = useState({});

    /**
     * Validates a single field on blur and marks it as touched.
     */
    const validateHandler = (e) => {
        const newErrors = validateCallback(values);
        setErrors(newErrors);
        setTouched((state) => ({...state, [e.target.name]: true}));
    };

    /**
     * Updates form values when an input changes.
     */
    const changeHandler = (e) => {
        setValues((state) => ({
            ...state,
            [e.target.name]: e.target.value,
        }));
    };

    /**
     * Registers an input field with value, change, and blur handlers.
     *
     * @param {keyof typeof values} inputName - Name of the form field.
     */
    const registerInput = (inputName) => ({
        name: inputName,
        value: values[inputName],
        onChange: changeHandler,
        onBlur: validateHandler,
    });

    /**
     * Validates the entire form and executes the submit callback
     * if no validation errors are found.
     */
    const formAction = async () => {
        const newErrors = validateCallback(values);
        setErrors(newErrors);
        setTouched(
            Object.keys(values).reduce((acc, k) => ({...acc, [k]: true}), {})
        );

        if (Object.keys(newErrors).length > 0) return;

        await callback(values);
    };

    return {
        values,
        errors,
        touched,
        registerInput,
        formAction,
        changeHandler,
    };
}
