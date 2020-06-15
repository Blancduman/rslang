import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import Example from './Components/Example';
import LoginPage from "./Components/login-page/LoginPage";

const App = () => (
  <Router>
    <Switch>
      <Route exact path="/">
        <LoginPage />
      </Route>
    </Switch>
  </Router>
);

export default App;
