export const jwtSplit = (jwt) => {
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


