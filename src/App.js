import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import Example from './Components/Example';
import Speakit from './Containers/Speakit';

const App = () => (
  <Router>
    <Switch>
      <Route exact path="/">
        <Example />
      </Route>
      <Route path="/speakit">
        <Speakit />
      </Route>
    </Switch>
  </Router>
);

export default App;
