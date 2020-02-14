import React from "react";
import {render} from "@testing-library/react";
import {AuthContextProvider} from "../context/AuthContext";
import {mockFailedFetch} from "../helpers/fetchMocks";
import {UserPage} from "../components/UserPage";

describe('User page', () => {

    afterEach(() => {
        // @ts-ignore
        global.fetch.resetMocks()
    });

    it("should render User Page", () => {

        mockFailedFetch();

        const userPage = render(
            <AuthContextProvider isContextLoaded={true} isLoggedIn={false} username={"alex_user"} role={"USER"}>
                <UserPage/>
            </AuthContextProvider>);

        expect(userPage.getByText("Welcome alex_user")).toBeInTheDocument();

    })
})