const User = (value) => {
    return { type: "LOGIN", value };
}
const List = (value) => {
    return { type: "DEVICE_LIST", value };
}

export {
    User,
    List
}
