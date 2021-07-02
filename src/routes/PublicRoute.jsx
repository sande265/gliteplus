import React from "react";
import { Route, Redirect } from "react-router-dom";
import { Header } from "../components";
import { isAuthenticated } from "../helper/GeneralHelpers";

const PublicRoute = ({ component: Component, restricted, ...rest }) => {
    return (
        // restricted = false meaning public route
        // restricted = true meaning restricted route
        <Route {...rest} render={props => (
            isAuthenticated() && restricted ?
                <Redirect to="/" />
                : <React.Fragment><Header /><Component {...props} /></React.Fragment>
        )} />
    );
};

export default PublicRoute;