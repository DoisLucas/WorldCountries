import React from 'react';

import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Main from './pages/main';
import Details from './pages/details';

const Routes = () => (
    <BrowserRouter>
        <Switch>
            <Route exact path="/" component={Main}/>
            <Route path="/details/:name" component={Details}/>
        </Switch>
    </BrowserRouter>
);

export default Routes;