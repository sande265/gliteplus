import React, { useState, useEffect } from 'react';
import { connect, shallowEqual, useDispatch, useSelector } from 'react-redux';
import { login } from '../../../actions/auth/auth-actions';

let initForm = {
    email: '',
    password: '',
    remember_me: 0
}

const SignIn = (props) => {
    const [form, setForm] = useState(initForm)
    const [errors, setError] = useState([])

    const { auth } = useSelector(state => ({
        auth: state.auth
    }), shallowEqual)
    const dispatch = useDispatch();

    useEffect(() => {
        let { success, error } = props.auth;
        if (success) {
            props.history.push('/home')
        }
        if (error) {
            if (error.response) {
                console.log("message", error.response.data);
                setError(error.response.data)
            }
        }
        // return
    }, [props.auth])

    const handleChange = (e) => {
        let { name, value } = e.target;
        if (errors[name] !== '') {
            errors[name] = ''
        }
        setForm({ ...form, [name]: value })
    }

    const onSubmit = (e) => {
        e.preventDefault()
        dispatch(login(form))
    }

    return (
        <div className="loginWrapper">
            <div className="loginContainer">
                <div className="container-fluid">
                    <div className="row login-form">
                        <div className="col-lg-4 col-md-5 col-sm-12">
                            <form action="" className="login-form" onSubmit={onSubmit}>
                                <div className="loginCard">
                                    <div className="form-group">
                                        <label htmlFor="email">Email address</label>
                                        <input type="email"
                                            autoComplete="email"
                                            className="form-control"
                                            id="email"
                                            aria-describedby="emailHelp"
                                            name="email"
                                            onChange={handleChange} />
                                        {errors['email'] && <small className="text-danger">{errors['email']}</small>}
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="password">Password</label>
                                        <input type="password"
                                            autoComplete="current-password"
                                            className="form-control" id="password"
                                            name="password"
                                            onChange={handleChange} />
                                        {errors['password'] && <small className="text-danger">{errors['password']}</small>}
                                    </div>
                                    <div className="form-group form-check">
                                        <input type="checkbox"
                                            className="form-check-input"
                                            id="remember" />
                                        <label className="form-check-label" htmlFor="remember">Remember Me</label>
                                    </div>
                                    <button type="submit" className="btn" style={{ backgroundColor: '#00C48D', color: '#fff' }}>
                                        {auth.processing ? <span className="spinner-border m-0 p-0"></span> : 'Submit'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

function mapStateToProps(state) {
    let { auth } = state;
    return {
        auth,
    }
}


export default connect(mapStateToProps)(SignIn)