const stateInit = {
    fullJwt: null,
    headers: null,
    payload: null,
    sig: null,
}

export default (state = stateInit, action) => {
    switch (action.type) {
        case 'SAVE_NEW_JWT':
            return  {
                fullJwt: action.fullJwt,
                headers: action.headers,
                payload: action.payload,
                sig: action.sig,
            };
        case 'DELETE_JWT':  
            return stateInit;
        case 'USER_LOGOUT':
            return stateInit;
        default:
           return state;
    }
};


