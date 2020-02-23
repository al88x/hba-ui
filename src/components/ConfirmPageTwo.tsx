import React from "react";
import {useForm} from "../helpers/useForm";
import {savePasswordsToDatabase} from "../helpers/AsyncJsonFetcher";
import {ConfirmPageThree} from "./ConfirmPageThree";
import "../styles/ConfirmationPageTwo.scss"


export interface IConfirmPageProps {
    token: string
}

interface IConfirmPageTwo {
    password: string,
    confirmPassword: string
}

export function ConfirmPageTwo(props: IConfirmPageProps) {

    const valuesInitialState = {password: "", confirmPassword: ""};
    const {handleChange, handleSubmit, values, errors,serverError, submittedSuccessfully, setServerError, setSubmittedSuccessfully} = useForm(submit, validateConfirmPageTwoForm, valuesInitialState);


    function validateConfirmPageTwoForm(values: IConfirmPageTwo) {
        let errors = {hasErrors: false, password: "", confirmPassword: ""};
        const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
        if (!passwordRegex.test(values.password)) {
            errors.password = "Password must be at least 8 characters long and " +
                "include at least 1 uppercase letter, " +
                "1 lowercase letter, " +
                "1 digit";
            errors.hasErrors = true;
        }
        if (values.confirmPassword !== values.password) {
            errors.password = "Password must be equal with confirmPassword";
            errors.confirmPassword = "Password must be equal with confirmPassword"
            errors.hasErrors = true;
        }
        if (errors.hasErrors) {
            return errors;
        }
        return {};
    }

    function submit() {
        const data = {token: props.token, password: values.password};
        savePasswordsToDatabase(JSON.stringify(data))
            .then(() => setSubmittedSuccessfully(true))
            .catch(() => setServerError(true))
    }

    if (submittedSuccessfully) {
        return <ConfirmPageThree token={props.token}/>
    }


    return (
        <section className="confirm-page-two">
            <h1>Set up password</h1>

                <label>Password</label>
                <input className={`${errors.password ? "input invalid" : "input"}`} data-testid="Password"
                       type="password"
                       value={values.password}
                       name="password"
                       onChange={handleChange}/>
                <p className={`${errors.password && "error"}`}>{errors.password}</p>

                <label>Confirm Password</label>
                <input className={`${errors.confirmPassword ? "input invalid" : "input"}`} data-testid="ConfirmPassword"
                       type="password"
                       name="confirmPassword"
                       value={values.confirmPassword}
                       onChange={handleChange}/>
                <p className={`${errors.confirmPassword && "error"}`}>{errors.confirmPassword}</p>

                <button className="submit" data-testid="SubmitButton" onClick={handleSubmit}>Submit</button>

                <p className={serverError ? "server-error visible" : "server-error"}>Error submitting your request.
                    Please try again later</p>

        </section>
    );
}