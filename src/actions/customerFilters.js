export const setCustomersSearchFilter = (text = '') => {
    console.log('CUSTOMERS=================');
    return {   
        type: 'SET_CUSTOMER_SEARCH_FILTER',
        text
    }
};