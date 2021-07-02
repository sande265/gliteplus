import { combineReducers } from "redux";
import { getMovie, getMovies, getUser, editUser, authReducer, alertReducer, changePassword } from "./";

const reducers = combineReducers({
    auth: authReducer,
    movies: getMovies,
    movie: getMovie,
    editUser,
    user: getUser,
    alerts: alertReducer,
    changePassword,
})

const rootReducer = (state, action) => {
    if (action.type === 'LOGOUT_SUCCESS') {
        state = undefined
    }
    return reducers(state, action)
}

export default rootReducer
