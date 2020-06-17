import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import Audiochallenge_main from './Components/audichallenge/Audiochallenge_main';

const App = () => (
  <Router>
    <Switch>
      <Route exact path="/">
        <Audiochallenge_main />
      </Route>
    </Switch>
  </Router>
);

export default App;
