export const saveNewJwt = (jwt, jwtSplit) => ({
    'type' : 'SAVE_NEW_JWT',
    jwt : {
        fullJwt: jwt,
        headers: jwtSplit.headers,
        payload: jwtSplit.payload,
        sig: jwtSplit.sig,
    }
       
});