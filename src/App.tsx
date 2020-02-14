import React, {useContext} from 'react';
import {BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom';
import {RouteProps} from 'react-router';
import {LoginPage} from "./components/LoginPage";
import {AuthContext, AuthContextProvider} from "./context/AuthContext";
import PageNotFound from "./components/PageNotFound";
import {UserPage} from "./components/UserPage";
import {AdminPage} from "./components/AdminPage";

const App: React.FC = () => {
    return (<AuthContextProvider>
            <Router>
                <Switch>
                    <Route exact path="/" component={LoginPage}/>
                    <ProtectedRoute exact path={"/admin"} component={AdminPage} roleFilter="ADMIN"/>
                    <ProtectedRoute exact path={"/user"} component={UserPage} roleFilter="USER"/>
                    <Route exact path="*"><PageNotFound/></Route>
                </Switch>
            </Router>
        </AuthContextProvider>

    );
}

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
