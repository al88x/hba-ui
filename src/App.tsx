import React, {useContext} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import {RouteProps} from 'react-router';
import {LoginPage} from "./components/LoginPage";
import {AuthContext, AuthContextProvider} from "./context/AuthContext";
import PageNotFound from "./components/PageNotFound";
import {UserPage} from "./components/UserPage";
import {AdminPage} from "./components/AdminPage";
import {Navbar} from "./components/navbar/Navbar";
import {MembersPage} from "./components/MembersPage";
import CreateMemberPage from "./components/CreateMemberPage";
import {MemberDetailsPage} from "./components/MemberDetailsPage";
import {ConfirmPageOne} from "./components/confirmPages/ConfirmPageOne";
import {ForgotPasswordPage} from "./components/ForgotPasswordPage";
import {PasswordSetUpPage, SetupPasswordMethod} from "./components/confirmPages/PasswordSetUpPage";

const App: React.FC = () => {
    return (
        <AuthContextProvider>
            <Router>
                <Navbar/>
                <Switch>
                    <Route exact path="/" component={LoginPage}/>
                    <Route exact path={"/confirm/:token"} component={ConfirmPageOne}/>
                    <Route exact path={"/forgot-password"} component={ForgotPasswordPage}/>
                    <Route exact path={"/reset-password/:token"} component={() => <PasswordSetUpPage account={SetupPasswordMethod.RESET}/>} />
                    <ProtectedRoute exact path={"/admin"} component={AdminPage} roleFilter="ADMIN"/>
                    <ProtectedRoute exact path={"/admin/members"} component={MembersPage} roleFilter="ADMIN"/>
                    <ProtectedRoute exact path={"/admin/members/create"} component={CreateMemberPage} roleFilter="ADMIN"/>
                    <ProtectedRoute exact path={"/admin/members/:id"} component={MemberDetailsPage} roleFilter="ADMIN"/>
                    <ProtectedRoute exact path={"/user"} component={UserPage} roleFilter="USER"/>
                    <Route exact path="*"><PageNotFound/></Route>
                </Switch>
            </Router>
        </AuthContextProvider>
    );
};

export interface ProtectedRouteProps extends RouteProps {
    roleFilter: String;
}
export const ProtectedRoute: React.FC<ProtectedRouteProps> = props => {
    const context = useContext(AuthContext);
    if(!context.state.isContextLoaded){
        return null;
    }

    if (context.state.isContextLoaded && !context.state.isLoggedIn) {
        return <Route component={LoginPage}/>;
    }

    if (context.state.isLoggedIn && props.roleFilter === context.state.role) {
        return <Route {...props} />;
    }

    return <Route component={PageNotFound}/>;
};

export default App;
