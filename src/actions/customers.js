
export const addCustomerChunck = (newChunk) => {
    return {
        type: 'SAVE_CHUNK',
        allCustomers : newChunk.results
    };
};