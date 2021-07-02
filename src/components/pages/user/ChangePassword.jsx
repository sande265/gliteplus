import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { changePassword } from '../../../actions/user';
import { unSetUserNavigation } from '../../../helper/GeneralHelpers';
import { successAlert, errorAlert } from '../../../actions/alerts/alert-action'
import Spinner from '../../../loaders/SpinnerWidget'

const ChangePassword = (props) => {

    const [form, setFormData] = useState({
        email: '',
        old_password: '',
        new_passsword: ''
    })
    const [processing, setProcessing] = useState(false)
    const [error, setError] = useState({})
    const dispatch = useDispatch()

    useEffect(() => {
        unSetUserNavigation()
        document.getElementById('me-change-password').classList.add("me-current-title")
    }, [])

    const handleChange = (e) => {
        e.preventDefault();
        let { name, value } = e.target;
        setFormData({ ...form, [name]: value })
    }

    const handleSubmit = () => {
        setProcessing(true)
        dispatch(changePassword(form)).then(res => {
            if (res && res.status === 400) {
                setProcessing(false)
                if (typeof error === 'object') setError(res.data.message)
                errorAlert({ type: `error`, message: res.data.message, showSnackbar: true })
            }
            else {
                setProcessing(false)
                successAlert({ type: `success`, message: `Password Successfully updated`, showSnackbar: true })
            }
        })
    }

    console.log("error", error);

    return (
        <div className="childWrapper">
            <div className="card">
                <div className="card-header">
                    <h3 className="card-title my-1">Change Password</h3>
                </div>
                <div className="card-body">
                    <div className="form-group">
                        <label htmlFor="email">Email address</label>
                        <input onChange={handleChange} autoComplete="new-password" name="email" type="email" className="form-control" id="email" aria-describedby="emailHelp" />
                        {error['email'] && <small className="form-text text-danger">{error['email']}</small>}
                    </div>
                    <div className="row">
                        <div className="col-6">
                            <div className="form-group">
                                <label htmlFor="old_password">Old Password</label>
                                <input onChange={handleChange}
                                    type="password"
                                    className="form-control"
                                    autoComplete="new-password"
                                    id="exampleInputPassword1"
                                    name="old_password"
                                    required />
                            </div>
                            {error['old_password'] && <small className="form-text text-danger">{error['old_password']}</small>}
                        </div>
                        <div className="col-6">
                            <div className="form-group">
                                <label htmlFor="new_password">New Password</label>
                                <input onChange={handleChange}
                                    type="password"
                                    autoComplete="new-password"
                                    className="form-control"
                                    id="new_password"
                                    name="new_password"
                                    required />
                            </div>
                            {error['new_password'] && <small className="form-text text-danger">{error['new_password']}</small>}
                        </div>
                    </div>
                    <button onClick={handleSubmit} type="submit" className="btn float-right" style={{ backgroundColor: '#00C48D', color: '#fff' }}>
                        {processing ? <Spinner color="white" /> : "Submit"}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ChangePassword;