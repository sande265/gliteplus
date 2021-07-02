export default function getMovie
    (state = { error: null, success: null, processing: false }, action) {

    switch (action.type) {
        case 'GET_MOVIE_SUCCESS':
            return { ...state, ...{ success: action.success, error: null } };

        case 'GET_MOVIE_ERROR':
            return { ...state, ...{ success: null, error: action.error } };

        case 'GET_MOVIE_PROCESSING':
            if (action.processing)
                return { ...state, ...{ processing: action.processing, success: null, error: null } }
            else
                return { ...state, ...{ processing: action.processing } };

        default:
            return state;
    }
}