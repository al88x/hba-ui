import React, {useContext} from "react";
import {Link} from "react-router-dom";
import {AuthContext} from "../../context/AuthContext";
import "../../styles/Navbar.scss"

export function Navbar() {
    const context = useContext(AuthContext);

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
                    <Link to="/" className="nav-element">Log Out</Link>
                </div>
            </nav>
        );
    }
    return null;
}