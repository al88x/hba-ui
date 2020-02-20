import React, {useContext, useState} from "react";
import "../styles/LoginPage.scss"
import {Redirect} from 'react-router-dom';
import {asyncJSONPostFetch, asyncGetUserDetails} from "../helpers/AsyncJsonFetcher";
import {AuthContext} from "../context/AuthContext";
import {useForm} from "../helpers/useForm";


interface ILoginForm {
    username:string,
    password:string
}

export function LoginPage() {
    const valuesInitialState:ILoginForm ={username: "", password: ""};
    const {handleChange, handleSubmit, values, errors} = useForm(submit, validateLoginForm, valuesInitialState);
    const [invalidCredentials, setInvalidCredentials] = useState(false);
    const context = useContext(AuthContext);

    function validateLoginForm(values:ILoginForm){
        let errors = {hasErrors:false, username:"", password:""};
        if(!values.username){
            errors.username = "Username should not be empty";
            errors.hasErrors = true;
        }
        if(!values.password){
            errors.password = "Password should not be empty";
            errors.hasErrors = true;
        }
        if(errors.hasErrors){
            return errors;
        }
        return {};
    }

    async function submit() {
        const formData = {
            username: values.username,
            password: values.password
        };
        const jsonResponse = await asyncJSONPostFetch("http://localhost:8080/login", JSON.stringify(formData)).finally();
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
            <form method="post" data-testid="LoginForm" onSubmit={event => {event.preventDefault();handleSubmit()}}>
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