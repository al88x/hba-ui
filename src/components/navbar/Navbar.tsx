import React, {useContext} from "react";
import {Link} from "react-router-dom";
import {AuthContext} from "../../context/AuthContext";
import "../../styles/Navbar.scss"
import {logout} from "../../helpers/AsyncJsonFetcher";

export function Navbar() {
    const context = useContext(AuthContext);

    function handleLogOut() {
        logout()
            .then(() => context.dispatch({type: "LOG_OUT"}));
    }

    if (context.state.role === "ADMIN") {
        return (
            <nav>
                <div className="nav-container">
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
                </div>
            </nav>
        );
    }
    return null;
}