import isEmpty from "is-empty"
import jwt from "jwt-decode"

export const handleLogout = () => {
    localStorage.removeItem("_Htoken")
    localStorage.removeItem("token_type")
    localStorage.removeItem("_hldRdxStr")
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

