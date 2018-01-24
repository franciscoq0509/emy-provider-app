const stateInit = {
    isCustomerFetching: false,
    isCustomerDetailsFetching: false,
    didInvalidate: false,
    didFail: false
};

export default (
    state = stateInit,
    action
    ) => {
        switch (action.type) {
            case 'INVALIDATE_CUSTOMERS':
                return {
                    didInvalidate: true,
                    isCustomerFetching: false,
                    isCustomerDetailsFetching: false,
                    didFail: false
                };
            case 'REQUEST_CUSTOMERS':
                return {    
                    isCustomerFetching: true,
                    isCustomerDetailsFetching: false,
                    didInvalidate: false,
                    didFail: false
                };
            case 'RECEIVE_CUSTOMERS_SUCCESS':
            console.log('recieve_customers_success');
                return {
                    isCustomerFetching: false,
                    isCustomerDetailsFetching: false,
                    didInvalidate: false,
                    didFail: false
                };
            case 'REQUEST_CUSTOMER_DETAILS':
                return {    
                    isCustomerFetching: false,
                    isCustomerDetailsFetching: true,
                    didInvalidate: false,
                    didFail: false
                };
            case 'SAVE_FULL_CUSTOMER_DETAILS':
            console.log('save_customers');
                return {
                    isCustomerFetching: false,
                    isCustomerDetailsFetching: false,
                    didInvalidate: false,
                    didFail: false
                };
            case 'USER_CANCELLED_DETAILS_REQUEST':
                return {
                    ...state,
                    isCustomerDetailsFetching: false
                }
            case 'USER_LOGOUT':
                return stateInit;
            default:
                return {
                    ...state
                };
        }
    };