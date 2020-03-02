import React from "react";
import {render, wait, fireEvent} from "@testing-library/react";
import {LoginPage} from "../components/LoginPage";
import {AuthContextProvider} from "../context/AuthContext";
import {mockFailedFetch, mockSuccessfulFetch} from "../helpers/fetchMocks";
import {BrowserRouter} from "react-router-dom";
import {act} from "react-dom/test-utils";


describe('login page', () => {

    afterEach(() => {
        // @ts-ignore
        global.fetch.resetMocks()
    });

    it("should render Login Page", () => {

        mockFailedFetch();

        const loginPage = render(
            <AuthContextProvider isContextLoaded={true} isLoggedIn={false}>
                <LoginPage/>
            </AuthContextProvider>);

        expect(loginPage.getByText("Username")).toBeInTheDocument();
        expect(loginPage.getByText("Password")).toBeInTheDocument();
        expect(loginPage.getByTestId("LoginForm")).toBeInTheDocument();
        expect(loginPage.getByTestId("InvalidCredentials")).toHaveClass("wrong-credentials");
        expect(loginPage.getByTestId("SubmitButton")).toBeInTheDocument();
        expect(loginPage.getByTestId("ForgotPassword")).toBeInTheDocument();

    });


    it("redirect to /admin on successful login", async () => {

        let response: any = ({"username": "alex_admin", "role": "ADMIN"});
        mockSuccessfulFetch(response);

        const app = render(
            <AuthContextProvider isContextLoaded={true} isLoggedIn={false}>
                <BrowserRouter>
                    <LoginPage/>
                </BrowserRouter>
            </AuthContextProvider>);

        const submitButton = app.getByTestId("SubmitButton");
        fireEvent(submitButton, new MouseEvent('click'));

        await wait(() => expect(app.queryByTestId("LoginForm")).toBeNull());
    });

    it("redirect to /user on successful login", async () => {

        let response: any = ({"username": "alex_user", "role": "USER"});
        mockSuccessfulFetch(response);

        const loginPage = render(
            <AuthContextProvider isContextLoaded={true} isLoggedIn={false}>
                <BrowserRouter>
                    <LoginPage/>
                </BrowserRouter>
            </AuthContextProvider>);

        const submitButton = loginPage.getByTestId("SubmitButton");
        fireEvent(submitButton, new MouseEvent('click'));

        await wait(() => expect(loginPage.queryByTestId("LoginForm")).toBeNull());
    });
})