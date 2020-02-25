import React, {useState} from "react";
import {useForm} from "../../helpers/useForm";
import {resetPassword, savePasswordToDatabase} from "../../helpers/AsyncJsonFetcher";
import {ConfirmPageThree} from "./ConfirmPageThree";
import "../../styles/PasswordSetUpPage.scss"
import {useParams} from "react-router-dom";

export enum SetupPasswordMethod {
    NEW, RESET
}

export interface IPasswordSetUpPageProps {
    account: SetupPasswordMethod;
}

interface IPasswordSetUpPage {
    password: string,
    confirmPassword: string
}

export function PasswordSetUpPage(props: IPasswordSetUpPageProps) {
    const {token} = useParams();
    const valuesInitialState = {password: "", confirmPassword: ""};
    const {handleChange, handleSubmit, values, errors, serverError, submittedSuccessfully, setServerError, setSubmittedSuccessfully} = useForm(submit, validatePasswordSetUpForm, valuesInitialState);
    const [passwordChanged, setPasswordChanged] = useState(false);

    function validatePasswordSetUpForm(values: IPasswordSetUpPage) {
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
            errors.confirmPassword = "Password must be equal with confirmPassword";
            errors.hasErrors = true;
        }
        if (errors.hasErrors) {
            return errors;
        }
        return {};
    }

    function submit() {
        console.log(props.account);
        console.log(token);
        const data = {token: token, password: values.password};
        if (props.account === SetupPasswordMethod.NEW) {
            savePasswordToDatabase(JSON.stringify(data))
                .then(() => setSubmittedSuccessfully(true))
                .catch(() => setServerError(true));
        }
        if(props.account === SetupPasswordMethod.RESET){
            resetPassword(JSON.stringify(data))
                .then(() => setPasswordChanged(true))
                .catch(() => setServerError(true));
        }
    }

    if (submittedSuccessfully) {
            return <ConfirmPageThree/>

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

            <button className={passwordChanged ? "submit invisible" : "submit"} data-testid="SubmitButton" onClick={handleSubmit}>Submit</button>

            <div className={passwordChanged ? "submit" : "submit invisible"}>
                <p className="successful-message">Account successfully created.</p>
                <a href="/" className="homepage-link">Go to Homepage</a>
            </div>


            <p className={serverError ? "server-error visible" : "server-error"}>Error submitting your request.
                Please try again later</p>

            <div className={props.account === SetupPasswordMethod.NEW ? "circle-container" : "invisible"}>
                <span className="circle"/>
                <span className="circle current-page"/>
                <span className="circle"/>
            </div>
        </section>
    );
}