const stateInit = { text : '' };

export default (state = stateInit, action) => {
    console.log(action.text);
    switch (action.type) {
        case 'SET_TEXT_FILTER':
        return {
            text: action.text
        }; 
        default:
            return state;
    }   
};