export default function changePassword
    (state = { error: null, success: null, processing: false }, action) {

    switch (action.type) {
        case 'CHANGE_PASSWORD_SUCCESS':
            return { ...state, ...{ success: action.success, error: null } };

        case 'CHANGE_PASSWORD_ERROR':
            return { ...state, ...{ success: null, error: action.error } };

        case 'CHANGE_PASSWORD_PROCESSING':
            if (action.processing)
                return { ...state, ...{ processing: action.processing, success: null, error: null } }
            else
                return { ...state, ...{ processing: action.processing } };

        default:
            return state;
    }
}