const stateInit = {allCustomers: []};

export default (state = stateInit, action) => {
    switch (action.type) {
        case 'SAVE_CHUNK':
        return {allCustomers: [...state.allCustomers, ...action.allCustomers]} 
        default:
            break;
    }   
};
