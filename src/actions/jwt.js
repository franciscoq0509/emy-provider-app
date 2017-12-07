export const saveNewJwt = (jwt, jwtSplit) => ({
    type : 'SAVE_NEW_JWT',
    fullJwt: jwt,
    headers: jwtSplit.headers,
    payload: jwtSplit.payload,
    sig: jwtSplit.sig,    
});

