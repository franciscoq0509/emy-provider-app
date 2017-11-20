const stateInit = {
    allCustomers: []
    //customerDetails: {}
};

//const stateInit = [];

export default (state = stateInit, action) => {
    //console.log(state);
    //console.log(action);
    switch (action.type) {
        case 'SAVE_CHUNK':
        console.log(state);
        console.log(action);
            return {
                allCustomers: [...state.allCustomers, ...action.allCustomers] 
                //customerDetails: {...state.customerDetails}
            };
        // case 'SAVE_CUSTOMER_DETAILS':
        //     return {
        //         allCustomers: [...state.allCustomers],
        //         customerDetails: {...action.customerDetails}
        //     };
        default:
            return state;
    }   
};

