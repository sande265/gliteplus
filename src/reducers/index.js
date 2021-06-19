import { combineReducers } from "redux";
import authReducer from "./auth-reducer";

const reducers = combineReducers({
    auth: authReducer,
})

const rootReducer = (state, action) => {
    // if (action.type === authConstants.LOGOUT_SUCCESS) {
    //     state = undefined
    // }

    return reducers(state, action)
}

export default rootReducer
