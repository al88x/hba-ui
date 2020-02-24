import React, {useContext, useState} from "react";
import {Link, Redirect} from "react-router-dom";
import {AuthContext} from "../../context/AuthContext";
import "../../styles/Navbar.scss"
import {logout} from "../../helpers/AsyncJsonFetcher";

export function Navbar() {
    const context = useContext(AuthContext);
    const[loggedOut, setLoggedOut] = useState(false);

    function handleLogOut(){
        logout()
            .then(()=> context.dispatch({type: "LOG_OUT"}));
    }

    if(loggedOut){
        return <Redirect to={"/"}/>;
    }

    if (context.state.role === "ADMIN") {
        return (
            <nav>
                <div className="main-nav-elements">
                    <div>
                        <Link to="/admin" className="nav-element">Home</Link>
                    </div>
                    <div>
                        <Link to="/admin/members" className="nav-element">Members</Link>
                    </div>
                </div>
                <div className="logOut">
                    <Link to="/" className="nav-element" onClick={handleLogOut}>Log Out</Link>
                </div>
            </nav>
        );
    }
    return null;
}