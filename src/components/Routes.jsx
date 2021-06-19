import React from 'react';
import { Route, Switch } from 'react-router';
import PrivateRoute from '../routes/PrivateRoute';
import PublicRoute from '../routes/PublicRoute';
import { Login, Home, Detail, NotFound, SignIn } from './'

const Routes = (props) => {
    return <Switch>

        <Route exact path={["/", "/login"]}>
            <PublicRoute restricted={true} exact path="/" component={Login} />
            <PublicRoute restricted={true} exact path="/login" component={SignIn} />
        </Route>

        <Route path={["/home", "/detail"]}>
            <PrivateRoute type="private" component={() =>
                <>
                    <Route path="/home" exact component={Home} />
                    <Route path="/detail" exact component={Detail} />
                    <Route path="/detail/:id" exact component={Detail} />
                </>
            } />
        </Route>


        <Route component={NotFound} />

    </Switch>
}

export default Routes