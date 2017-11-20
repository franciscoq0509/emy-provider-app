export const invalidateCustomers = () => ({ //user refreshes
    type: 'INVALIDATE_CUSTOMERS'
});

export const requestCustomers = () => ({ //fetch new customers
    type: 'REQUEST_CUSTOMERS'
});

export const receiveNewCustomers = (newCustomers) => ({ //recieving new customers success
    type: 'RECEIVE_CUSTOMERS_SUCCESS',
    allCustomers : newCustomers.results,
    receivedAt: Date.now()
});

export const receiveCustomersError = (error) => ({ //recieving new customers failure
    type: 'RECEIVE_CUSTOMERS_FAILURE',
    error,
    receivedAt: Date.now()
});

export const addCustomerChunk = (newChunk) => ({ //save Customers
    type: 'SAVE_CHUNK',
    allCustomers : newChunk.results
});






export const selectCustomerForDetails = (id) => ({ //user clicks on customers name
    type: 'SELECT_CUSTOMER_FOR_DETAILS',
    id
});

export const requestCustomerDetails = (id) => ({ //fetches customer details
    type: 'REQUEST_CUSTOMER_DETAILS',
    id
});

export const recieveCustomerDetailsSuccess = (id) => ({ //recieve new customer details success
    type: 'RECIEVE_CUSTOMER_DETAILS_SUCCESS',
    id
});

export const recieveCustomerDetailsFailure = (error) => ({ //recieve new customer details failure
    type: 'RECIEVE_CUSTOMER_DETAILS_FAILURE',
    error
});


export const saveCustomerDetails = (customersDetails) => ({ //save customer details
    type: 'SAVE_CUSTOMER_DETAILS',
    customersDetails
});

//create a new action creator that handles request failures