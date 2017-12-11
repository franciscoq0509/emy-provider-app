const stateInit = {
    allActivities: {},
    allActivityIds: [],
    errorMessage: "",
    revievedAt: null
};

export default (state = stateInit, action) => {
    console.log(action);
    switch (action.type) {
        case 'RECEIVE_ACTIVITIES_SUCCESS':
            return {
               allActivities: action.allActivities,
               allActivityIds: action.allActivityIds,
               receivedAt: action.receivedAt 
            }
        case 'RECEIVE_ACTIVITIES_FAILURE':
            return {
                ...state,
                errorMessage: action.error
            }
    
        default:
            return state;
    }
}