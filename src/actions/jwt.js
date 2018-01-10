import { jwtSplit } from '../utilities/jwtSplit';

export const saveNewJwt = (jwt) => {
    const jwtSplitObj = jwtSplit(jwt);
    return {
        type : 'SAVE_NEW_JWT',
        fullJwt: jwt,
        headers: jwtSplitObj.headers,
        payload: jwtSplitObj.payload,
        sig: jwtSplitObj.sig,    
    };
};

export const deleteJwt = () => {
    console.log('in delete_jwt action');
    return {
        type : 'DELETE_JWT'
    }
}

