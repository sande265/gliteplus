const persistedState = localStorage.getItem('_hldRdxStr')
export const reduxStore = () => {
    let initState = {}
    if (persistedState) {
        initState = JSON.parse(persistedState)
    }
    return initState
}

export const updateReduxStore = (store) => {
    localStorage.setItem('_hldRdxStr', JSON.stringify(store.getState()))
}
