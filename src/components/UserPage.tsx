import React, {useContext} from "react";
import {AuthContext} from "../context/AuthContext";

export function UserPage(){
    const context = useContext(AuthContext);

    return(
        <div>
            <h1>Welcome {context.state.username}</h1>
        </div>
    );
}