import { jwtSplit } from '../utilities/jwtSplit';

export const saveNewJwt = (jwt) => {
    console.log(jwt);
    const jwtSplitObj = jwtSplit(jwt);
    return {
        type : 'SAVE_NEW_JWT',
        fullJwt: jwt,
        headers: jwtSplitObj.headers,
        payload: jwtSplitObj.payload,
        sig: jwtSplitObj.sig,    
    };
};

