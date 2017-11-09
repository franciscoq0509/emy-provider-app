export default (state = [], action) => {
    switch (action.type) {
        case 'SAVE_CHUNK':
            return [...state, action.newChunk]
        default:
            break;
    }   
};
