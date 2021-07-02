import axios from 'axios';
import { getToken } from '../axios';

function _success(success) {
    return { type: 'GET_MOVIE_SUCCESS', success }
}

function _error(error) {
    return { type: 'GET_MOVIE_ERROR', error }
}

function _processing(processing) {
    return { type: 'GET_MOVIE_PROCESSING', processing }
}

const getMovie = (id) => {
    return dispatch => {
        dispatch(_processing(true));
        const options = {
            url: process.env.REACT_APP_API_URL + `/movies/${id}`,
            method: 'get',
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
            return error
        });
        return request
    }
}

export default getMovie;