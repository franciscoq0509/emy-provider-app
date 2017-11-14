const stateInit = [];

export default (state = stateInit, action) => {
    switch (action.type) {
        case 'SAVE_CHUNK':
        return [
            ...state, 
            ...action.allCustomers
        ] 
        default:
            return state;
    }   
};
