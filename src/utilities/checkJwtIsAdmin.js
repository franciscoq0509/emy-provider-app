const jwtDecode = require('jwt-decode');

export default (jwt) => {
    console.log('made it to function');
    console.log(jwtDecode);
    const decoded = jwtDecode(jwt);
    console.log(decoded);
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