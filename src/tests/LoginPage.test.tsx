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

    })

    it("should not render Login Page if context is not loaded", () => {

        mockFailedFetch();

        const loginPage = render(
            <AuthContextProvider isContextLoaded={false} isLoggedIn={false}>
                <LoginPage/>
            </AuthContextProvider>);

        expect(loginPage.queryByTestId("LoginForm")).toBeNull();

    })

    it("username and password input fields should update username variable", async () => {

        mockFailedFetch();

        const loginPage = render(
            <AuthContextProvider isContextLoaded={true} isLoggedIn={false}>
                <LoginPage/>
            </AuthContextProvider>);

        const inputUsername = loginPage.getByTestId("Username");
        const inputPassword = loginPage.getByTestId("Password");

        await act(async () => {
            fireEvent.change(inputUsername, {target: {value: 'randomLongUsernameString'}});
            fireEvent.change(inputPassword, {target: {value: 'randomLongPasswordString'}});
        })

        expect(loginPage.getByDisplayValue("randomLongPasswordString")).toBeInTheDocument();
        expect(loginPage.getByDisplayValue("randomLongUsernameString")).toBeInTheDocument();
    });

    it("show login page with invalid credentials message on unsuccessful login", async () => {

        mockFailedFetch();

        const loginPage = render(
            <AuthContextProvider isContextLoaded={true} isLoggedIn={false}>
                <LoginPage/>
            </AuthContextProvider>);

        const submitButton = loginPage.getByTestId("SubmitButton");
        fireEvent(submitButton, new MouseEvent('click'));

        await wait(() => expect(loginPage.getByText("Username")).toBeInTheDocument());
        await wait(() => expect(loginPage.getByText("Password")).toBeInTheDocument());
        await wait(() => expect(loginPage.getByTestId("LoginForm")).toBeInTheDocument());
        await wait(() => expect(loginPage.getByTestId("InvalidCredentials")).toHaveClass("wrong-credentials visible"));

    });

    it("redirect to /admin on successful login", async () => {

        let response: any = ({"username": "alex_admin", "role": "ADMIN"});
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