import {useEffect, useState} from "react";

export const useForm = (callback:any, valuesInitialState:any) => {
    const [values, setValues] = useState<any>(valuesInitialState);
    const [errors, setErrors] = useState<any>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submittedSuccessfully, setSubmittedSuccessfully] = useState(false);
    const [serverError, setServerError] = useState(false);

    const handleChange = (event: any) => {
        const {name, value} = event.target;
        setValues({...values, [name]: value})
    };

    const handleSubmit = () => {
        setErrors(validateForm(values));
        setIsSubmitting(true);
    };

    const handleValidationErrorsAfterSubmit = (error:any) => {
        setErrors(error);
    };

    useEffect(() => {
        if (Object.keys(errors).length === 0 && isSubmitting) {
            callback();
        }
    }, [errors]);

    function validateForm(values:any) {
        let errors = {hasErrors: false, firstName: "", lastName: "", employeeNumber: "", email: "", shift:"", jobRole:"", department:"", area:"" , resetNewPassword: "", confirmResetNewPassword: "", username: "", password:""};
        if (values.firstName !=null && values.firstName.length === 0) {
            errors.firstName = "First name cannot be empty";
            errors.hasErrors = true;
        }
        if (values.lastName !=null && values.lastName.length === 0) {
            errors.lastName = "Last name cannot be empty";
            errors.hasErrors = true;
        }
        if (values.employeeNumber !=null && values.employeeNumber.length === 0) {
            errors.employeeNumber = "Employee number cannot be empty";
            errors.hasErrors = true;
        } else if (values.employeeNumber !=null && isNaN(+values.employeeNumber)) {
            errors.employeeNumber = "Employee number should be a number";
            errors.hasErrors = true;
        }
        const validEmailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (values.email !=null && !validEmailRegex.test(values.email)) {
            errors.email = "Please enter a valid email";
            errors.hasErrors = true;
        }

        if (values.shift !=null && values.shift.length === 0) {
            errors.shift = "Please select your shift";
            errors.hasErrors = true;
        }
        if (values.jobRole !=null && values.jobRole.length === 0) {
            errors.jobRole = "Please select your role";
            errors.hasErrors = true;
        }
        if (values.department !=null && values.department.length === 0) {
            errors.department = "Please select your department";
            errors.hasErrors = true;
        }
        if (values.area !=null && values.area.length === 0) {
            errors.area = "Please select your area";
            errors.hasErrors = true;
        }

        const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
        if (values.resetNewPassword != null && !passwordRegex.test(values.resetNewPassword)) {
            errors.resetNewPassword = "Password must be at least 8 characters long and " +
                "include at least 1 uppercase letter, " +
                "1 lowercase letter, " +
                "1 digit";
            errors.hasErrors = true;
        }
        if (values.confirmResetNewPassword !== values.resetNewPassword) {
            errors.resetNewPassword = "Password must be equal with confirmPassword";
            errors.confirmResetNewPassword = "Password must be equal with confirmPassword";
            errors.hasErrors = true;
        }

        if (values.username != null && values.username.length === 0) {
            errors.username = "Username should not be empty";
            errors.hasErrors = true;
        }
        if (values.password!=null && values.password.length === 0) {
            errors.password = "Password should not be empty";
            errors.hasErrors = true;
        }
        console.log(errors);
        if (errors.hasErrors) {
            return errors;
        }
        return {};
    }

    return {
        handleChange,
        handleSubmit,
        values,
        errors,
        serverError,
        submittedSuccessfully,
        setSubmittedSuccessfully,
        setServerError,
        handleValidationErrorsAfterSubmit
    };
};