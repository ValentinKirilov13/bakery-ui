import {useState} from "react";

export default function useForm(initialValues, callback) {
    const [values, setValues] = useState(initialValues);

    const changeHandler = (e) => {
        setValues((state) => ({
            ...state,
            [e.target.name]: e.target.value,
        }));
    };

    const registerInput = (inputName) => ({
        name: inputName,
        onChange: changeHandler,
        value: values[inputName],
    });

    const formAction = async () => {
        await callback(values);
    };

    return {registerInput, formAction};
}
