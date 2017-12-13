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
        default:
           return state;
    }
};


