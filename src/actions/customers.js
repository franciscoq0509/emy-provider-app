
export const addCustomerChunck = (newChunk) => ({
    type: 'SAVE_CHUNK',
    allCustomers : newChunk.results
});

export const saveCustomerDetails = (customerDetails) => ({
    type: 'SAVE_CUSTOMER_DETAILS',
    customerDetails
});