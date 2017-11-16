
export const addCustomerChunck = (newChunk) => ({
    type: 'SAVE_CHUNK',
    allCustomers : newChunk.results
});

export const saveCustomerDetails = (customerDetailsObject) => ({
    type: 'SAVE_CUSTOMER_DETAILS',
    customerDetails: customerDetailsObject.results[0]
});