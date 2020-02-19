import {useEffect, useState} from "react";

export const useForm = (callback:any, validate:any, initialState:any) => {
    const [values, setValues] = useState<any>(initialState);
    const [errors, setErrors] = useState<any>({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (event: any) => {
        const {name, value} = event.target;
        setValues({...values, [name]: value})
    };

    const handleSubmit = () => {
        setErrors(validate(values));
        setIsSubmitting(true);
    };

    useEffect(() => {
        if (Object.keys(errors).length === 0 && isSubmitting) {
            callback();
        }
    }, [callback,errors,isSubmitting]);

    return {
        handleChange,
        handleSubmit,
        values,
        errors
    };
};