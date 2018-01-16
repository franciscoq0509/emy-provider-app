const initState = {
    isFetching: false,
    didInvalidate: false,
    didFail: false
};

export default (
    state = initState,
    action
    ) => {
        switch (action.type) {
            case 'INVALIDATE_CUSTOMERS':
                return {
                   // ...state,
                    didInvalidate: true,
                    isFetching: false,
                    didFail: false
                };
            case 'REQUEST_CUSTOMERS':
                return {    
                    //...state,
                    isFetching: true,
                    didInvalidate: false,
                    didFail: false
                };
            case 'RECEIVE_CUSTOMERS_SUCCESS':
                return {
                    //...state,
                    isFetching: false,
                    didInvalidate: false,
                    didFail: false
                };
            case 'REQUEST_CUSTOMER_DETAILS':
            console.log('is fetching to true');
                return {    
                    //...state,
                    isFetching: true,
                    didInvalidate: false,
                    didFail: false
                };
            case 'SAVE_FULL_CUSTOMER_DETAILS':
            console.log('is fetching to false');
                return {
                    isFetching: false,
                    didInvalidate: false,
                    didFail: false
                }
            default:
                return {
                    ...state
                };
        }
    };