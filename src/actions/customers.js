
export const addCustomerChunk = (newChunk) => ({
    type: 'SAVE_CHUNK',
    allCustomers : newChunk.results
});

export const saveCustomerDetails = (customerDetails) => ({
    type: 'SAVE_CUSTOMER_DETAILS',
    customerDetails
});

export const selectCustomerForDetails = (id) => ({
    type: 'SELECT_CUSTOMER_FOR_DETAILS',
    id
});

export const invalidateCustomers = () => ({
    type: 'INVALIDATE_CUSTOMERS'
});

export const receiveNewCustomers = (newCustomers) => ({
    type: 'RECEIVE_CUSTOMERS',
    allCustomers : newCustomers.results,
    receivedAt: Date.now()
});

//create a new action creator that handles request failures