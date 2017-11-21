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
                    ...state,
                    didInvalidate: true
                };
            case 'REQUEST_CUSTOMERS':
                return {
                    ...state,
                    isFetching: true,
                    didInvalidate: false
                };
            case 'RECEIVE_CUSTOMERS_SUCCESS':
                return {
                    ...state,
                    isFetching: false,
                    didInvalidate: false,
                }
            default:
                return state;
        }
    };