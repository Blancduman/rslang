import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import Example from './Components/Example';
import GameSprintPage from "./Components/GameSprintPage/GameSprintPage";

const App = () => (
  <Router>
    <Switch>
      <Route exact path="/">
        {/*<Example />*/}
        <GameSprintPage/>
      </Route>
    </Switch>
  </Router>
);

export default App;
