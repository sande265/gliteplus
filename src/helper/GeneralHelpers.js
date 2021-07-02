import isEmpty from "is-empty"
import jwt from "jwt-decode"

export const handleLogout = () => {
    localStorage.clear()
}

export const isAuthenticated = () => {
    let token = localStorage.getItem("_Htoken");
    if (!token && isEmpty(token)) {
        handleLogout()
        return false
    }
    else if (jwt(token).exp < Date.now() / 1000) {
        handleLogout()
        return false
    }
    return true
}

export const unSetUserNavigation = () => {
    document.getElementById('me-user-details').classList.remove("me-current-title")
    document.getElementById('me-edit-user').classList.remove("me-current-title")
    document.getElementById('me-change-password').classList.remove("me-current-title")
}

export const formatTime = (seconds) => {
    if (isNaN(seconds)) return '00:00'
    const date = new Date(seconds * 1000)
    const hh = date.getUTCHours()
    const mm = date.getUTCMinutes()
    const ss = date.getUTCSeconds()
    if (hh) return `${hh}: ${mm.toString().padStart(2, "0")}:${ss}`
    return `${mm}:${ss}`
}

