const stateInit = {
    fullJwt: null,
    headers: null,
    payload: null,
    sig: null,
}

export default (state = stateInit, action) => {
    console.log('reducer', state);
    switch (action.type) {
        case 'SAVE_NEW_JWT':
            return  {
                fullJwt: action.fullJwt,
                headers: action.headers,
                payload: action.payload,
                sig: action.sig,
            };
        case 'DELETE_JWT':  
            console.log('about to delete jwt from store..');
            return {
                fullJwt: null,
                headers: null,
                payload: null,
                sig: null,
            }
        default:
           return state;
    }
};


