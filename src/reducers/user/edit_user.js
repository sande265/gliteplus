export default function editUser
    (state = { error: null, success: null, processing: false }, action) {

    switch (action.type) {
        case 'EDIT_USER_SUCCESS':
            return { ...state, ...{ success: action.success, error: null } };

        case 'EDIT_USER_ERROR':
            return { ...state, ...{ success: null, error: action.error } };

        case 'EDIT_USER_PROCESSING':
            if (action.processing)
                return { ...state, ...{ processing: action.processing, success: null, error: null } }
            else
                return { ...state, ...{ processing: action.processing } };

        default:
            return state;
    }
}