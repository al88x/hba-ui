import React from 'react';
import {render,} from '@testing-library/react';
import {ProtectedRoute} from '../App';
import {AuthContextProvider} from "../context/AuthContext";
import {mockFailedFetch} from "../helpers/fetchMocks";
import {AdminPage} from "../components/AdminPage";
import {BrowserRouter} from "react-router-dom";
import {UserPage} from "../components/UserPage";



describe('App page', () => {

    afterEach(() => {
        // @ts-ignore
        global.fetch.resetMocks()
    });

    it("should redirect to Login Page", () => {

        mockFailedFetch();

        const app = render(
            <AuthContextProvider isContextLoaded={true} isLoggedIn={false} username="null" role="null">
                <BrowserRouter>
                    <ProtectedRoute component={AdminPage} roleFilter="ADMIN"/>
                </BrowserRouter>
            </AuthContextProvider>);

        expect(app.getByTestId("LoginForm")).toBeInTheDocument();
    });

    it("should redirect to Admin page", () => {

        mockFailedFetch();

        const app = render(
            <AuthContextProvider isContextLoaded={true} isLoggedIn={true} username="alex_admin" role="ADMIN" >
                <BrowserRouter>
                    <ProtectedRoute component={AdminPage} roleFilter="ADMIN"/>
                </BrowserRouter>
            </AuthContextProvider>);


        expect(app.getByText("Welcome alex_admin")).toBeInTheDocument();
    })

    it("should redirect to Page Not Found page", () => {

        mockFailedFetch();

        const app = render(
            <AuthContextProvider isContextLoaded={true} isLoggedIn={true} username="alex_admin" role="ADMIN" >
                <BrowserRouter>
                    <ProtectedRoute component={UserPage} roleFilter="USER"/>
                </BrowserRouter>
            </AuthContextProvider>);


        expect(app.getByText("404")).toBeInTheDocument();
        expect(app.getByText("Oops! Page not found")).toBeInTheDocument();
    })

    it("should return null", () => {

        mockFailedFetch();

        const app = render(
            <AuthContextProvider isContextLoaded={false} isLoggedIn={false} >
                <BrowserRouter>
                    <ProtectedRoute component={UserPage} roleFilter="USER"/>
                </BrowserRouter>
            </AuthContextProvider>);


        expect(app.queryByTestId("LoginForm")).toBeNull();
    })
})