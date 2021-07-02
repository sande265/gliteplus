import React from 'react';
import { Route, Switch } from 'react-router';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';
import { Home, Detail, NotFound, SignIn, Info, ViewUser, Player } from '../components'

const Routes = (props) => {
    return <Switch>

        <Route exact path={["/", "/login"]}>
            <PublicRoute exact path="/" component={Info} />
            <PublicRoute restricted={true} exact path="/login" component={SignIn} />
        </Route>

        <Route path={["/home", "/detail", "/user"]}>
            <PrivateRoute type="private" component={() =>
                <>
                    <Route path="/home" exact component={Home} />
                    <Route path="/user/:id" component={ViewUser} />
                    <Route path="/detail" exact component={Detail} />
                    <Route path="/detail/:id" exact component={Detail} />
                    <Route path="/detail/:id/play" exact component={Player} />
                </>
            } />
        </Route>

        <Route component={NotFound} />

    </Switch>
}

export default Routes;