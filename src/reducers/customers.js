const stateInit = {
    allCustomers: [],
    customersFilter: [],
    customerDetails: {}
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
                allCustomers: [...state.allCustomers, ...action.allCustomers] ,
                customersFilter : [...state.customersFilter],
                customerDetails: {...state.customerDetails}
            };
        case 'SAVE_CUSTOMER_DETAILS':
            return {
                allCustomers: [...state.allCustomers],
                customersFilter : [...state.customersFilter],
                customerDetails: {...action.customerDetails}
            };
        default:
            return state;
    }   
};
