import React, {useContext} from "react";
import {AuthContext} from "../context/AuthContext";
import "../styles/AdminPage.scss"

export function AdminPage() {
    const context = useContext(AuthContext);

    return(
        <div className="admin-page">
            <p className="welcome" data-testid="Welcome">Welcome {context.state.username}</p>
        </div>
    );
}