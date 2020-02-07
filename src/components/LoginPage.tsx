import React, {useState} from "react";
import "./LoginPage.scss"


export function LoginPage() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    function handleSubmitLogin() {

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
                <div className="login-forgot-container">
                    <input className="submit" type="submit" value="Login" data-testid="SubmitButton"/>
                    <a className="forgot-password">Forgot password</a>
                </div>
            </form>
        </section>
    );
}