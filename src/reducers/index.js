import { combineReducers } from "redux";
import authReducer from "./auth-reducer";

const reducers = combineReducers({
    auth: authReducer,
})

const rootReducer = (state, action) => {
    if (action.type === 'LOGOUT_SUCCESS') {
        state = null
    }
    return reducers(state, action)
}

export default rootReducer
