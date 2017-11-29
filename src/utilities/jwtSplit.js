export const jwtSplit = (jwt) => {
    console.log('return three parts of JWT');
    //console.log(jwt.split('.'));
    return (
            jwt.split('.').length === 3 ? 
            {
                headers: jwt.split('.')[0], 
                payload: jwt.split('.')[1], 
                sig: jwt.split('.')[2]
            } 
            : 
            false
        );
};


