import React from "react";
import {useForm} from "../helpers/useForm";
import "../styles/ForgotPasswordPage.scss"
import {sendPasswordResetEmail} from "../helpers/AsyncJsonFetcher";

interface IForgotPasswordForm {
    email: string
}

export function ForgotPasswordPage() {
    const {handleChange, handleSubmit, values, errors, submittedSuccessfully, setSubmittedSuccessfully} = useForm(submit, {email: ""});

    function submit() {
        sendPasswordResetEmail(values.email)
            .then(() => setSubmittedSuccessfully(true))
            .catch(error => console.log(error));
    }

    return (
        <section className="forgot-password-container">
            <h1>Forgot Password</h1>
            <label>Please write your email address</label>
            <input className={`${errors.email ? "input invalid" : "input"}`}
                   type="text"
                   name="email"
                   data-testid="Email"
                   value={values.email}
                   onChange={handleChange}/>
            <p className={`${errors.email && "error"}`}>{errors.email}</p>

            <button className={submittedSuccessfully ? "invisible" : "submit"} data-testid="SubmitButton"
                    onClick={handleSubmit}>Submit
            </button>
            <a href="/" className={submittedSuccessfully ? "submit-message" : "invisible"} data-testid="SubmittedSuccessfullyMessage">
                A password reset email has been sent
            </a>
        </section>
    )
}