import React from 'react';
import { Route, Switch } from 'react-router';
import { Login, Home, Detail } from '.';

const Routes = () => {
    return <Switch>
        <Route exact path="/" component={Login} />
        <Route exact path="/home" component={Home} />
        <Route exact path="/detail/:id" component={Detail} />
    </Switch>
}

export default Routes