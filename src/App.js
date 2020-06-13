import React from 'react';
import { Route, Switch, HashRouter } from 'react-router-dom';
import Example from './Components/Example';

const App = () => {
    return (
        <HashRouter>
            <Switch>
                <Route exact path='/' component={Example} />
                <Route path='/helloworld'>
                    <Example />
                </Route>
            </Switch>
        </HashRouter>
    )
}

export default App;