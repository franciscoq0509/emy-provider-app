const stateInit = { text : '' };

export default (state = stateInit, action) => {
    switch (action.type) {
        case 'SET_CUSTOMER_SEARCH_FILTER':
        return {
            text: action.text
        };
    case 'USER_LOGOUT':
        return stateInit;
        default:
            return state;
    }   
};