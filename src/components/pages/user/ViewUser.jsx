import React, { useEffect, useState } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { clearAlerts } from '../../../actions/alerts/alert-action';
import SnackbarMessages from '../../../snackbar/SnackbarMessages';
import ChangePassword from './ChangePassword';
import EditUser from './EditUser';
import UserDetail from './UserDetail';

const ViewUser = (props) => {
    let { id } = props.match.params;

    const { alerts } = useSelector(state => ({
        alerts: state.alerts
    }), shallowEqual)
    const dispatch = useDispatch()

    const [showSnackbar, setShowSnackbar] = useState(false)

    useEffect(() => {
        setShowSnackbar(alerts && alerts.showSnackbar)
    }, [alerts])

    const handleSnackbar = () => {
        dispatch(clearAlerts())
        setShowSnackbar(!showSnackbar)
    }

    return (
        <div className="content">
            {(alerts.type === "success" || alerts.type === "error") && showSnackbar && (
                <SnackbarMessages
                    message={alerts.message}
                    variant={alerts.type}
                    duration={5000}
                    handleClose={e => handleSnackbar(e)}
                    open={showSnackbar}
                />
            )}
            <div className="container-fluid">
                <div className="boxWrapper">
                    <div className="row">
                        <div className="col-lg-3 col-md-6">
                            <div className="me-left-menu ">
                                <h3 className="me-menu-header me-menu-open">
                                    Manage Account
                                </h3>
                                <div className="me-menu-body text-dark">
                                    <a onClick={() => props.history.push(`/user/${id}`)} >
                                        <p className="me-menu-title" id="me-user-details">User Details</p>
                                    </a>
                                    <a onClick={() => props.history.push(`/user/${id}/edit-profile`)}>
                                        <p className="me-menu-title" id="me-edit-user">Edit Profile</p>
                                    </a>
                                    <a onClick={() => props.history.push(`/user/${id}/change-password`)}>
                                        <p className="me-menu-title" id="me-change-password">Change Password</p>
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-9 col-md-6">
                            <Switch>
                                <Route exact path={props.match.path} component={UserDetail} />
                                <Route path={`${props.match.path}/edit-profile`} component={EditUser} />
                                <Route path={`${props.match.path}/change-password`} component={ChangePassword} />
                            </Switch>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default (ViewUser);