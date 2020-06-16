import React, {useEffect, useState} from 'react';
import {BrowserRouter as Router, Route, Switch,} from 'react-router-dom';
import LoginPage from "./Components/login-page/LoginPage";

const App = () => {
    let storedUser = localStorage.getItem('user');
    storedUser = storedUser ? JSON.parse(storedUser) : {authorized: false};
    const [user, setUser] = useState(storedUser);

    useEffect(() => {
        console.log(user);
        localStorage.setItem('user', JSON.stringify(user))
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
