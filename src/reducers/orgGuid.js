const stateInit = {
    orgGuid: null
}

export default (state = stateInit, action) => {
    switch (action.type) {
        case 'SAVE_ORG_GUID':
            return  {
                orgGuid: action.guid
            };
        case 'DELETE_ORG_GUID':  
            return {
                orgGuid: null
            }
        default:
           return state;
    }
};


