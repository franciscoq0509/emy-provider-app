const stateInit = [];

export default (state = stateInit, action) => {
    switch (action.type) {
        case 'SAVE_CUSTOMER_DETAILS':
            return {
                ...action.customersDetails
            };
        default:
            return state;
    }   
};