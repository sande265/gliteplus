import React from 'react';
import { useDispatch } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import { _logoutUser } from '../actions/auth/auth-actions';
import { Header } from '../components';
import { isAuthenticated } from "../helper/GeneralHelpers";

const PrivateRoute = ({ component: Component, ...rest }) => {
    const dispatch = useDispatch()
    return (

        // Show the component only when the user is logged in
        // Otherwise, redirect the user to /signin page
        <Route {...rest} render={props => (
            isAuthenticated() ?
                <React.Fragment><Header /><Component {...props} /></React.Fragment>
                : dispatch(_logoutUser(null)) && <Redirect to="/" />
        )} />
    );
};

export default PrivateRoute;