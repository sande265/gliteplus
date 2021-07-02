import React, { useEffect, useState } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { errorAlert, successAlert } from '../../../actions/alerts/alert-action';
import { editUser, getUser } from '../../../actions/user';
import { unSetUserNavigation } from '../../../helper/GeneralHelpers';
import LoadingSpinner from '../../../loaders/SpinnerWidget'

const EditUser = (props) => {
    const { id } = props.match.params

    const { user } = useSelector(state => ({
        user: state.user,
    }), shallowEqual)
    const dispatch = useDispatch()

    const [form, setFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        username: ''
    })

    useEffect(() => {
        dispatch(getUser(id))
        if (user.success) user.success = null;
        if (user.error) user.error = null
    }, [])

    useEffect(() => {
        let { success, error } = user;
        if (error && error.response && error.response.data) {
            dispatch(errorAlert(
                { type: `error`, message: error.response.data.message, showSnackbar: true }
            ))
        } else if (success && success.data) {
            setFormData(success.data.data[0])
        }
    }, [user])

    useEffect(() => {
        unSetUserNavigation()
        document.getElementById('me-edit-user').classList.add("me-current-title")
    }, [])

    const handleChange = (e) => {
        let { name, value } = e.target;
        setFormData({ ...form, [name]: value })
    }

    const handleSubmit = () => {
        dispatch(editUser(id, form)).then(res => {
            if (res.status === 400) console.log("error", res.data.message);
            else {
                dispatch(successAlert({ type: `success`, message: res.data && res.data.message, showSnackbar: true }));
                dispatch(getUser(id));
            }
        })
    }

    return (
        <div className="childWrapper">
            <div className="row">
                <div className="col-12">
                    <div className="card">
                        <div className="card-header">
                            <div className="btn-group-sm">
                                <span className='card-title'>Edit Profile</span>
                                <button className="btn btn-default float-right">
                                    <i className="ri-arrow-left-fill mt-1 mr-1"></i> Back
                                </button>
                            </div>
                        </div>
                        <div className="card-body">
                            {user.processing ? <div className=""><LoadingSpinner /></div> : <React.Fragment>
                                <div className="row">
                                    <div className="col-12">
                                        <img className="profile-image my-2" src={form.image} alt="User" />
                                    </div>
                                    <div className="col-lg-6 col-sm-12 my-1">
                                        <label htmlFor="first_name">First Name</label>
                                        <input type="text" onChange={handleChange} name="first_name" value={form.first_name} className="form-control" />
                                    </div>
                                    <div className="col-lg-6 col-sm-12 my-1">
                                        <label htmlFor="last_name">Last Name</label>
                                        <input type="text" onChange={handleChange} name="last_name" value={form.last_name} className="form-control" />
                                    </div>
                                    <div className="col-lg-6 col-sm-12 my-1">
                                        <label htmlFor="email">Email</label>
                                        <input type="email" onChange={handleChange} name="email" disabled value={form.email} className="form-control" />
                                    </div>
                                    <div className="col-lg-6 col-sm-12 my-1">
                                        <label htmlFor="username">Username</label>
                                        <input type="text" onChange={handleChange} name="username" disabled value={form.username} className="form-control" />
                                    </div>
                                </div>
                                <button onClick={handleSubmit} type="submit" className="btn mt-1 float-right" style={{ backgroundColor: '#00C48D', color: '#fff' }}>
                                    {/* <span className="spinner-border m-0 p-0"></span> */}
                                    Submit
                                </button>
                            </React.Fragment>}
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default EditUser;