import React from "react";
import {render} from "@testing-library/react";
import {AuthContextProvider} from "../context/AuthContext";
import {mockFailedFetch} from "../helpers/fetchMocks";
import PageNotFound from "../components/PageNotFound";

describe('Page Not Found page', () => {

    afterEach(() => {
        // @ts-ignore
        global.fetch.resetMocks()
    });

    it("should render Page Not Found Page", () => {

        mockFailedFetch();

        const pageNotFound = render(
            <AuthContextProvider isContextLoaded={true} isLoggedIn={true} username={"alex_user"} role={"USER"}>
                <PageNotFound/>
            </AuthContextProvider>);

        expect(pageNotFound.getByText("404")).toBeInTheDocument();
        expect(pageNotFound.getByText("Oops! Page not found")).toBeInTheDocument();

    })
})