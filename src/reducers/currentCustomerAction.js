const stateInit = {
    isFetching: false,
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
                    isFetching: false,
                    didFail: false
                };
            case 'REQUEST_CUSTOMERS':
                return {    
                    isFetching: true,
                    didInvalidate: false,
                    didFail: false
                };
            case 'RECEIVE_CUSTOMERS_SUCCESS':
                return {
                    isFetching: false,
                    didInvalidate: false,
                    didFail: false
                };
            case 'REQUEST_CUSTOMER_DETAILS':
                return {    
                    isFetching: true,
                    didInvalidate: false,
                    didFail: false
                };
            case 'SAVE_FULL_CUSTOMER_DETAILS':
                return {
                    isFetching: false,
                    didInvalidate: false,
                    didFail: false
                };
            case 'USER_LOGOUT':
                return stateInit;
            default:
                return {
                    ...state
                };
        }
    };