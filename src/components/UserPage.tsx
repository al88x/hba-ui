import React, {useContext} from "react";
import {AuthContext} from "../context/AuthContext";
import "../styles/UserPage.scss"

export function UserPage(){
    const context = useContext(AuthContext);
    return(
        <div className="user-page">
            <h1 className="welcome">Welcome {context.state.username}</h1>
        </div>
    );
}