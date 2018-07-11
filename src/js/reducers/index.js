const reducer = (state, action) => {

    switch (action.type) {

        case 'LOGIN':
        return Object.assign({}, state, {
            login: action.value
        })

        case 'DEVICE_LIST':
        return Object.assign({}, state, {
            list: action.value,
        })

        default:
        return state;

    }

}

export default reducer;
