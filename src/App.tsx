import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import {LoginPage} from "./components/LoginPage";

const App: React.FC = () => {
    return (
        <Router>
            <Switch>
                <Route exact path="/login">
                    <LoginPage/>
                </Route>
            </Switch>
        </Router>
    );
}

export default App;
