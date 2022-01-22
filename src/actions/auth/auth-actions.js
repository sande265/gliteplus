import axios from 'axios';
import jwt from 'jwt-decode';
import { setAuthToken } from '../axios';

function _success(success) {
    return { type: 'AUTH_SUCCESS', success }
}

function _error(error) {
    return { type: 'AUTH_ERROR', error }
}

function _processing(processing) {
    return { type: 'AUTH_PROCESSING', processing }
}

function _setCurrentUser(user) {
    return { type: 'SET_CURRENT_USER', user }
}

function _logoutUser(state) {
    return { type: 'LOGOUT_SUCCESS', state }
}

const login = (payload) => {
    return dispatch => {
        dispatch(_processing(true));
        const options = {
            url: process.env.REACT_APP_API_URL + '/v1/auth/login',
            method: 'post',
            data: payload,
            headers: {
                'Content-Type': 'application/json',
            }
        };
        let request = axios(options).then(res => {
            dispatch(_processing(false));
            dispatch(_success(res));
            setAuthToken(res.data.access_token)
            localStorage.setItem('token_type', res.data.token_type)
            let user = jwt(res.data.access_token)
            dispatch(_setCurrentUser(user))
            return res
        }).catch(error => {
            dispatch(_error(error));
            dispatch(_processing(false));
            return error
        });
        return request
    }
}

export {
    login,
    _setCurrentUser,
    _logoutUser
};