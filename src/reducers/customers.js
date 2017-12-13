const stateInit = {
    allCustomers: {},
    allCustomerIds: [],
    receivedAt: {}
};

export default (state = stateInit, action) => {
    switch (action.type) {
        case 'RECEIVE_CUSTOMERS_SUCCESS':
            return {
                allCustomers: action.allCustomers !== undefined ? {...state.allCustomers, ...action.allCustomers} : {...state.allCustomers},
                allCustomerIds: action.allCustomerIds,
                receivedAt:  action.receivedAt
            };
        default:
            return state;
    }   
};

