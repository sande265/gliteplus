export default function authReducer
    (state = { error: null, success: null, processing: false, currentUser: null }, action) {

    switch (action.type) {
        case 'AUTH_SUCCESS':
            return { ...state, ...{ success: action.success, error: null } };

        case 'SET_CURRENT_USER':
            return { ...state, ...{ currentUser: action.user } };

        case 'AUTH_ERROR':
            return { ...state, ...{ success: null, error: action.error } };

        case 'AUTH_PROCESSING':
            if (action.processing)
                return { ...state, ...{ processing: action.processing, success: null, error: null } }
            else
                return { ...state, ...{ processing: action.processing } };

        default:
            return state;
    }
}