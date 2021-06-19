import isEmpty from "is-empty"
import jwt from "jwt-decode"

export const handleLogout = () => {
    localStorage.clear()
}

export const isAuthenticated = () => {
    let token = localStorage.getItem("_Htoken");
    if (!token && isEmpty(token))
        return false
    else if (jwt(token).exp < Date.now() / 1000) {
        return false
    }
    return true
}

