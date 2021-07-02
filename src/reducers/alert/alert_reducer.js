export default function alertReducer
    (state = {
        type: '',
        varient: ``,
        message: '',
        title: '',
        showSnackbar: false
    }, action) {

    switch (action.type) {
        case 'ALERT_SUCCESS':
            return { ...state, type: `success`, message: action.message, showSnackbar: true }
        case 'ALERT_ERROR':
            return { ...state, type: `error`, message: action.message, showSnackbar: true }
        case 'ALERT_CLEAR':
            return { ...state, type: ``, message: ``, title: ``, showSnackbar: false }
        default:
            return state
    }
}