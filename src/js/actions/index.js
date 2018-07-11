const Login = (value) => {
    return { type: "LOGIN", value };
}
const List = (value) => {
    return { type: "DEVICE_LIST", value };
}

export {
    Login,
    List
}
