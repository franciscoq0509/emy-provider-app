
export const addCustomerChunck = (newChunk) => {
    return {
        type: 'SAVE_CHUNK',
        newChunk
    };
};