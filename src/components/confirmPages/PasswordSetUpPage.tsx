import React, {useEffect, useState} from "react";
import {useForm} from "../../helpers/useForm";
import {isResetPasswordTokenValid, resetPassword, savePasswordToDatabase} from "../../helpers/AsyncJsonFetcher";
import {ConfirmPageThree} from "./ConfirmPageThree";
import "../../styles/PasswordSetUpPage.scss"
import {useParams} from "react-router-dom";
import PageNotFound from "../PageNotFound";

export enum SetupPasswordMethod {
    NEW, RESET
}

export interface IPasswordSetUpPageProps {
    account: SetupPasswordMethod;
}

interface IPasswordSetUpPage {
    resetNewPassword: string,
    confirmResetNewPassword: string
}

export function PasswordSetUpPage(props: IPasswordSetUpPageProps) {
    const {token} = useParams();
    const valuesInitialState = {resetNewPassword: "", confirmResetNewPassword: ""};
    const {handleChange, handleSubmit, values, errors, serverError, submittedSuccessfully, setServerError, setSubmittedSuccessfully} = useForm(submit, valuesInitialState);
    const [passwordChanged, setPasswordChanged] = useState(false);
    const [isTokenValid, setIsTokenValid] = useState(false);


    function submit() {
        console.log(props.account);
        console.log(token);
        const data = {token: token, password: values.resetNewPassword};
        if (props.account === SetupPasswordMethod.NEW) {
            savePasswordToDatabase(JSON.stringify(data))
                .then(() => setSubmittedSuccessfully(true))
                .catch(() => setServerError(true));
        }
        if (props.account === SetupPasswordMethod.RESET) {
            resetPassword(JSON.stringify(data))
                .then(() => setPasswordChanged(true))
                .catch(() => setServerError(true));
        }
    }

    useEffect(() => {
        if (props.account === SetupPasswordMethod.RESET && token) {
            isResetPasswordTokenValid(token)
                .then(() => setIsTokenValid(true))
                .catch(() => setIsTokenValid(false));
        }
    }, [token]);

    if (submittedSuccessfully) {
        return <ConfirmPageThree/>
    }

    if (props.account === SetupPasswordMethod.NEW || isTokenValid) {

        return (
            <section className="confirm-page-two">
                <h1>Set up password</h1>

                <label>Password</label>
                <input className={`${errors.resetNewPassword ? "input invalid" : "input"}`} data-testid="Password"
                       type="password"
                       value={values.resetNewPassword}
                       name="resetNewPassword"
                       onChange={handleChange}/>
                <p className={`${errors.resetNewPassword && "error"}`}>{errors.resetNewPassword}</p>

                <label>Confirm Password</label>
                <input className={`${errors.confirmResetNewPassword ? "input invalid" : "input"}`}
                       data-testid="ConfirmPassword"
                       type="password"
                       name="confirmResetNewPassword"
                       value={values.confirmResetNewPassword}
                       onChange={handleChange}/>
                <p className={`${errors.confirmResetNewPassword && "error"}`}>{errors.confirmResetNewPassword}</p>

                <button className={passwordChanged ? "submit invisible" : "submit"} data-testid="SubmitButton"
                        onClick={handleSubmit}>Submit
                </button>

                <div className={passwordChanged ? "submit" : "submit invisible"}>
                    <p className="successful-message">Password changed successfully.</p>
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
    return <PageNotFound/>
}
