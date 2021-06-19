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

export function login(payload) {
    return dispatch => {
        dispatch(_processing(true));
        const options = {
            url: process.env.REACT_APP_API_URL + '/signin',
            method: 'post',
            data: payload,
            headers: {
                'Content-Type': 'application/json',
            }
        };
        axios(options)

            .then(res => {
                dispatch(_processing(false));
                dispatch(_success(res));
                setAuthToken(res.data.token)
                localStorage.setItem('token_type', res.data.token_type)
                let user = jwt(res.data.token)
                dispatch(_setCurrentUser(user))
            }).catch(error => {
                dispatch(_error(error));
                dispatch(_processing(false));
            });
    }
}

export default login;