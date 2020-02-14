import React from "react";
import "../styles/PageNotFound.scss"



export default function PageNotFound(){
    return (
        <div className="page-not-found">
            <p className="error-404">404</p>
            <p className="not-found">Oops! Page not found</p>
        </div>
    )
}