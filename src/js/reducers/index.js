const reducer = (state, action) => {

    switch (action.type) {

        case 'LOGIN':
        return Object.assign({}, state, {
            user: action.value
        })

        case 'DEVICE_LIST':
        return Object.assign({}, state, {
            list: action.value
        })

        default:
        return state;

    }

}

export default reducer;
