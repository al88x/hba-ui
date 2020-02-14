import React from "react";
import {render, wait, fireEvent} from "@testing-library/react";
import {AuthContextProvider} from "../context/AuthContext";
import {mockFailedFetch, mockSuccessfulFetch} from "../helpers/fetchMocks";
import {AdminPage} from "../components/AdminPage";

describe('Admin page', () => {

    afterEach(() => {
        // @ts-ignore
        global.fetch.resetMocks()
    });

    it("should render Admin Page", () => {

        mockFailedFetch();

        const adminPage = render(
            <AuthContextProvider isContextLoaded={true} isLoggedIn={false} username={"alex_admin"} role={"ADMIN"}>
                    <AdminPage/>
            </AuthContextProvider>);

        expect(adminPage.getByText("Welcome alex_admin")).toBeInTheDocument();

    })
})