import React, {useEffect, useState} from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from 'react-router-dom';
import Example from './Components/Example';
import LoginPage from "./Components/login-page/LoginPage";

const App = () => {
    const [user, setUser] = useState({
        message: "Authenticated"
    });
    useEffect(() => {
        console.log(user);
    }, [user]);

    return (
        <Router>
            <Switch>
                <Route exact path="/">
                    <LoginPage
                        user={user}
                        setUser={setUser}
                    />
                </Route>
            </Switch>
        </Router>
    )
};

export default App;
