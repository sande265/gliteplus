import axios from 'axios';
import { getToken } from '../axios';

function _success(success) {
    return { type: 'CHANGE_PASSWORD_SUCCESS', success }
}

function _error(error) {
    return { type: 'CHANGE_PASSWORD_ERROR', error }
}

function _processing(processing) {
    return { type: 'CHANGE_PASSWORD_PROCESSING', processing }
}

const changePassword = (payload) => {
    return dispatch => {
        dispatch(_processing(true));
        const options = {
            url: process.env.REACT_APP_API_URL + '/change-password',
            method: 'patch',
            data: payload,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + getToken()
            }
        };
        let request = axios(options).then(res => {
            dispatch(_processing(false));
            dispatch(_success(res));
            return res
        }).catch(error => {
            dispatch(_error(error));
            dispatch(_processing(false));
            return error.response
        });
        return request
    }
}

export default changePassword;