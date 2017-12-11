const stateInit = { text : '' };

export default (state = stateInit, action) => {
    switch (action.type) {
        case 'SET_ACTIVITIES_SEARCH_FILTER':
        return {
            text: action.text
        }; 
        default:
            return state;
    }   
};