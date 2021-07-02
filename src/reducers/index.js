import authReducer from "./auth/auth-reducer";
import getMovies from "./movies/get-movies";
import getMovie from './movies/get-movie'
import editUser from "./user/edit_user";
import getUser from "./user/get_user";
import alertReducer from "./alert/alert_reducer";
import changePassword from './user/change_password'

export {
    authReducer,
    getMovie,
    getUser,
    getMovies,
    editUser,
    alertReducer,
    changePassword,
}