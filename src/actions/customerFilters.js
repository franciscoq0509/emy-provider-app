export const setCustomersSearchFilter = (text = '') => {
    return {   
        type: 'SET_CUSTOMER_SEARCH_FILTER',
        text
    }
};