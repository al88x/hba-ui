import React, {useContext} from "react";
import {AuthContext} from "../context/AuthContext";


export function AdminPage() {
    const context = useContext(AuthContext);

    return(
        <div>
            <h1 data-testid="Welcome">Welcome {context.state.username}</h1>
        </div>
    );
}