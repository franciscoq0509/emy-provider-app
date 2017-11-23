const stateInit = {
    allCustomers: {},
    receivedAt: {}
};

export default (state = stateInit, action) => {
    console.log(state);
    console.log(action);
    switch (action.type) {
        case 'RECEIVE_CUSTOMERS_SUCCESS':
            return {
                allCustomers: action.allCustomers !== undefined ? {...state.allCustomers, ...action.allCustomers} : {...state.allCustomers},
                receivedAt:  action.receivedAt
            };
        default:
            return state;
    }   
};

