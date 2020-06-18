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
        <Example />
      </Route>
      <Route path="/speakit">
        <Example />
      </Route>
      <Route path="/savannah">
        <Example />
      </Route>
      <Route path="/sprint">
        <GameSprintPage />
      </Route>
      <Route path="/english_puzzle">
        <Example />
      </Route>
      <Route path="/promo">
        <Example />
      </Route>
      <Route path="/about">
        <Example />
      </Route>
    </Switch>
  </Router>
);

export default App;
