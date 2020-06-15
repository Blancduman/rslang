import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import Savanna from './Components/Savanna';

const App = () => (
  <Router>
    <Switch>
      <Route exact path="/">
        <Savanna />
      </Route>
    </Switch>
  </Router>
);

export default App;
