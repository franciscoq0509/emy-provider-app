const stateInit = {
    fullJwt: "",
    headers: "",
    payload: "",
    sig: "",
}

export default (state = stateInit, action) => {
    switch (action.type) {
        case 'SAVE_NEW_JWT':
            return action.jwt;
        default:
           return state
    }
};