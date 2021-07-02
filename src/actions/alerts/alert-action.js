export const successAlert = (data) => {
    return { type: 'ALERT_SUCCESS', varient: data.type, message: data.message, title: data.title, showSnackbar: data.showSnackbar };
}

export const errorAlert = (data) => {
    return { type: 'ALERT_ERROR', varient: data.type, message: data.message, title: data.title, showSnackbar: data.showSnackbar };
}

export const clearAlerts = () => {
    return { type: 'ALERT_CLEAR' };
}
