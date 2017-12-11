export const setCustomersSearchFilter = (text = '') => {
    return {   
        type: 'SET_TEXT_FILTER',
        text
    }
};