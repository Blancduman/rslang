import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';

import Savanna from './Components/_savanna/Savanna';

import Example from './Components/Example';
import 'antd/dist/antd.css';

const App = () => (
  <Router>
    <Switch>
      <Route exact path="/">
        <Savanna />
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
        <Example />
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
