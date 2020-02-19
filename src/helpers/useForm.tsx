import {useEffect, useState} from "react";

export const useForm = (callback:any, validate:any, valuesInitialState:any) => {
    const [values, setValues] = useState<any>(valuesInitialState);
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

    const handleErrorsAfterSubmit = (error:any) => {
        setErrors(error);
    };

    useEffect(() => {
        if (Object.keys(errors).length === 0 && isSubmitting) {
            callback();
        }
    }, [errors]);

    return {
        handleChange,
        handleSubmit,
        values,
        errors,
        handleErrorsAfterSubmit
    };
};