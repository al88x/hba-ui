import React, {useContext, useState} from "react";
import "../styles/LoginPage.scss"
import {Redirect} from 'react-router-dom';
import {asyncJSONPostFetch, asyncGetUserDetails} from "../helpers/AsyncJsonFetcher";
import {AuthContext} from "../context/AuthContext";
import {useForm} from "../helpers/useForm";


interface ILoginForm {
    username: string,
    password: string
}

export function LoginPage() {
    const valuesInitialState: ILoginForm = {username: "", password: ""};
    const {handleChange, handleSubmit, values, errors} = useForm(submit, valuesInitialState);
    const [invalidCredentials, setInvalidCredentials] = useState(false);
    const context = useContext(AuthContext);

    async function submit() {
        const formData = {
            username: values.username,
            password: values.password
        };
        const jsonResponse = await asyncJSONPostFetch(`${process.env.REACT_APP_HBA_API_URL}/login`, JSON.stringify(formData)).finally();

        if (jsonResponse.status === 200) {
            await asyncGetUserDetails()
                .then(jsonResponse => context.dispatch({type: "FETCH_USER", payload: jsonResponse}))
        } else {
            setInvalidCredentials(true);
        }
    }

    if (!context.state.isContextLoaded) {
        return null;
    }

    if (context.state.role === "ADMIN") {
        return (<Redirect to={"/admin"}/>);
    }

    if (context.state.role === "USER") {
        return (<Redirect to={"/user"}/>);
    }

    return (
        <section className="loginPage">
            <h1>Login</h1>
            <form data-testid="LoginForm" onSubmit={event => {event.preventDefault();handleSubmit();}}>
                <label>Username</label>
                <input className="input" type="text" data-testid="Username"
                       name="username"
                       value={values.username}
                       onChange={handleChange}/>
                <p className={`${errors.username && "error"}`}>{errors.username}</p>
                <label>Password </label>
                <input className="input" type="password" data-testid="Password"
                       name="password"
                       value={values.password}
                       onChange={handleChange}/>
                <p className={`${errors.password && "error"}`}>{errors.password}</p>

                <p data-testid="InvalidCredentials"
                   className={invalidCredentials ? "wrong-credentials visible" : "wrong-credentials"}>Invalid Username
                    or Password</p>
            </form>
            <div className="login-forgot-container">
                <button className="submit" data-testid="SubmitButton" onClick={handleSubmit}>Submit</button>
                <a href="/forgot-password" className="forgot-password" data-testid="ForgotPassword">Forgot
                    password</a>
            </div>
        </section>
    );
}