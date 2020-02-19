import React, {useContext, useState} from "react";
import "../styles/LoginPage.scss"
import {Redirect} from 'react-router-dom';
import {asyncJSONPostFetch, asyncGetUserDetails} from "../helpers/AsyncJsonFetcher";
import {AuthContext} from "../context/AuthContext";


export function LoginPage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [invalidCredentials, setInvalidCredentials] = useState(false);
    const context = useContext(AuthContext);


    async function handleSubmitLogin(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const formData = {
            username: username,
            password: password
        };
        const jsonResponse = await asyncJSONPostFetch("http://localhost:8080/login", JSON.stringify(formData)).finally();
        setUsername("");
        setPassword("");
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
            <form method="post" data-testid="LoginForm" onSubmit={handleSubmitLogin}>
                <label>Username</label>
                <input className="input" type="text" data-testid="Username" value={username}
                       onChange={event => setUsername(event.target.value)}/>
                <label>Password </label>
                <input className="input" type="password" data-testid="Password" value={password}
                       onChange={event => setPassword(event.target.value)}/>
                <p data-testid="InvalidCredentials"
                   className={invalidCredentials ? "wrong-credentials visible" : "wrong-credentials"}>Invalid Username
                    or Password</p>
                <div className="login-forgot-container">
                    <input className="submit" type="submit" value="Login" data-testid="SubmitButton"/>
                    <a href="/forgot-password" className="forgot-password" data-testid="ForgotPassword">Forgot
                        password</a>
                </div>
            </form>
        </section>
    );
}