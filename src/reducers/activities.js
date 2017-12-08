const stateInit = {
    activities: {},
    errorMessage: "",
    revievedAt: null
};

export default (state = stateInit, action) => {
    console.log(action);
    switch (action.type) {
        case 'RECEIVE_ACTIVITIES_SUCCESS':
            return {
               activities: action.activities.activities,
               receivedAt: action.receivedAt 
            }
        case 'RECEIVE_CUSTOMERS_FAILURE':
            return {
                ...state,
                errorMessage: action.error
            }
    
        default:
            return state;
    }
}