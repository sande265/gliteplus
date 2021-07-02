import React, { useEffect } from 'react';
import { useState } from 'react';
import { connect, useSelector } from 'react-redux';
import { unSetUserNavigation } from '../../../helper/GeneralHelpers';

const UserDetail = (props) => {

    const { user } = useSelector(state => ({
        user: state.auth.currentUser.user
    }))

    useEffect(() => {
        unSetUserNavigation()
        document.getElementById('me-user-details').classList.add("me-current-title")
    }, [])

    return (
        <div className="childWrapper">
            <div className="card">
                <div className="card-header">
                    <h3 className="card-title my-1">User Details</h3>
                </div>
                <div className="box-body">
                    <div className="row">
                        <div className="col-12">
                            <img className="profile-image my-2" src={user && user.image} alt="User" />
                        </div>
                        <div className="col-12">
                            <div className="card">
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-6">
                                            <label>Name:</label>
                                            <p>{user.first_name + ' ' + user.last_name}</p>
                                        </div>
                                        <div className="col-6">
                                            <label>Email:</label>
                                            <p>{user.email}</p>
                                        </div>
                                        <div className="col-6">
                                            <label>User Group:</label>
                                            <p>{user.role}</p>
                                        </div>
                                        <div className="col-6">
                                            <label>Active Since:</label>
                                            <p>{new Date(user.created_at).toISOString().split('T')[0]}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    let { auth } = state;
    return {
        auth
    }
}

export default connect(mapStateToProps)(UserDetail);