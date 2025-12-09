import {useState} from "react";

export default function useForm(initialValues, callback, validateCallback) {
    const [values, setValues] = useState(initialValues);
    const [errors, setErrors] = useState({});
    const [touched, setTouched] = useState({});
    const [loading, setLoading] = useState(false);

    const validateHandler = (e) => {
        const newErrors = validateCallback(values);
        setErrors(newErrors);
        setTouched((state) => ({...state, [e.target.name]: true}));
    };

    const changeHandler = (e) => {
        setValues((state) => ({
            ...state,
            [e.target.name]: e.target.value,
        }));
    };

    const registerInput = (inputName) => ({
        name: inputName,
        value: values[inputName],
        onChange: changeHandler,
        onBlur: validateHandler,
    });

    const submittingHandler = () => {
        setLoading(true);
    };

    const formAction = async () => {
        const newErrors = validateCallback(values);
        setErrors(newErrors);
        setTouched(
            Object.keys(values).reduce((acc, k) => ({...acc, [k]: true}), {})
        );

        if (Object.keys(newErrors).length > 0) {
            setLoading(false);
            return;
        }

        await callback(values);

        setLoading(false);
    };

    return {
        values,
        errors,
        touched,
        loading,
        registerInput,
        formAction,
        changeHandler,
        submittingHandler,
    };
}
