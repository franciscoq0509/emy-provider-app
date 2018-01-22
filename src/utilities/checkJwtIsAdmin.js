const jwtDecode = require('jwt-decode');

export default (jwt) => {
    const decoded = jwtDecode(jwt);
    if(
        'organisations' in decoded && 
        Array.isArray(decoded.organisations) &&
        !!decoded.organisations[1] && 
        !!decoded.organisations[1].user_role
    ) {
        return decoded.organisations[1].user_role === 'Admin' ? true : false;
    } else {
        return false;
    }
   
};