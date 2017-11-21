const initState = {
    isFetching: false,
    didInvalidate: false,
    didFail: false
};

export default (
    state = initState,
    action
    ) => {
        console.log(action);
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
                }
            default:
                return {
                    isFetching: false,
                    didInvalidate: false,
                    didFail: false
                };
        }
    };