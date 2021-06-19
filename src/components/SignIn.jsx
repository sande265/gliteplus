import React, { useState } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { login } from '../actions/auth/auth-actions';

let initForm = {
    email: '',
    password: '',
    remember_me: 0
}

const SignIn = (props) => {
    const [form, setForm] = useState(initForm)

    const { auth } = useSelector(state => ({
        auth: state.auth
    }), shallowEqual)
    const dispatch = useDispatch();

    const handleChange = (e) => {
        let { name, value } = e.target;
        setForm({ ...form, [name]: value })
    }

    const onSubmit = (e) => {
        e.preventDefault()
        dispatch(login(form)).then(
            props.history.push(`/home`)
        )
    }

    return (
        <div className="loginWrapper">
            <div className="section">
                <div className="content">
                    <div className="container-fluid">
                        <div className="row login-form">
                            <div className="col-lg-4 col-md-5 col-sm-12">
                                <form action="" className="login-form" onSubmit={onSubmit}>
                                    <div className="loginCard">
                                        <div className="form-group">
                                            <label htmlFor="email">Email address</label>
                                            <input type="email" autoComplete="new-password" className="form-control" id="email" aria-describedby="emailHelp" name="email" onChange={handleChange} />
                                            <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="password">Password</label>
                                            <input type="password" autoComplete="new-password" className="form-control" id="password" name="password" onChange={handleChange} />
                                        </div>
                                        <div className="form-group form-check">
                                            <input type="checkbox" className="form-check-input" id="remember" />
                                            <label className="form-check-label" htmlFor="remember">Remember Me</label>
                                        </div>
                                        <button type="submit" className="btn btn-primary">
                                            {auth.processing ? <span className="spinner-border m-0 p-0"></span> : 'Submit'}
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SignIn