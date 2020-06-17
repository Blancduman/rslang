import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import Example from './Components/Example';
import Dictionary from './Containers/Dictionary';
import GameSprintPage from './Components/GameSprintPage/GameSprintPage';

const App = () => (
  <Router>
    <Switch>
      <Route exact path="/">
        <Example />
      </Route>
      <Route path="/dictionary">
        <Dictionary />
      </Route>
        <Route exact path="/sprint">
        <GameSprintPage />
      </Route>
    </Switch>
  </Router>
);

export default App;
