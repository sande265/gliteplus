import axios from "axios";
import isEmpty from "is-empty";
import jwt_decode from "jwt-decode";

export const isTokenExpired = () => {
    let token = localStorage.getItem("_Htoken");
    if (!isEmpty(token) && jwt_decode(token).exp < Date.now() / 1000) {
        return true
    }
    return false
}


export const setAuthToken = token => {
    if (token) {
        // Apply authorization token to every request if logged in
        localStorage.setItem("_Htoken", token);
    } else {
        // Delete auth header
        localStorage.removeItem("_Htoken");
    }
};

export async function getBase64(url, mimetype = null) {
    let token = localStorage.getItem("_Htoken");
    const options = {
        url: url,
        method: 'get',
        responseType: 'arraybuffer',
        headers: {
            Authorization: `Bearer ${token}`
        }
    };
    return await axios(options)
        .then(response => {
            return _imageEncode(response.data, mimetype)
        })
}

export async function getImagePath(url) {
    let token = localStorage.getItem("_Htoken");
    const options = {
        url: url,
        method: 'get',
        responseType: 'blob',
        headers: {
            Authorization: `Bearer ${token}`
        }
    };
    return await axios(options)
        .then((response) => {
            if (response.status === 200) {
                return response.data;
            }
        });
}

function _imageEncode(arrayBuffer, mimetype = "image/jpeg") {
    let u8 = new Uint8Array(arrayBuffer)
    let b64encoded = btoa([].reduce.call(new Uint8Array(arrayBuffer), function (p, c) { return p + String.fromCharCode(c) }, ''))
    return "data:" + mimetype + ";base64," + b64encoded
}