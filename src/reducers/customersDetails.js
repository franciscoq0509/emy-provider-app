const stateInit = {};

export default (state = stateInit, action) => {
    switch (action.type) {
        case 'SAVE_CUSTOMER_DETAILS':
            return {
                ...state,
                ...action.customerDetails
            };
        default:
            return state;
    }   
};