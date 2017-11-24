export const setTextFilter = (text = '') => {
    console.log(text);
    return {   
        type: 'SET_TEXT_FILTER',
        text
    }
};