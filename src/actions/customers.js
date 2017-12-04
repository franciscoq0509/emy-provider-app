import { normalizeBasicCustomerDetails } from '../normalize/basicCustomerData';
import { normalizedFullCustomerDetails } from '../normalize/basicCustomerData';


//user refreshes
export const invalidateCustomers = () => ({ 
    type: 'INVALIDATE_CUSTOMERS'
});

//fetch new customers
export const requestCustomers = () => {
    //console.log('request action fired');
    return {
        type: 'REQUEST_CUSTOMERS'
    }
};

//recieving new customers success
export const receiveNewCustomers = (newCustomers) => { 
    //console.log('just befoe norm function');
    const normalizedCustomers = normalizeBasicCustomerDetails(newCustomers);
    //console.log(normalizedCustomers);
    return {
        type: 'RECEIVE_CUSTOMERS_SUCCESS',
        allCustomers : normalizedCustomers.allCustomers,
        allCustomerIds: normalizedCustomers.allCustomerIds,
        receivedAt: Date.now()
    }
};

//recieving new customers failure
export const receiveCustomersError = (error) => ({ 
    type: 'RECEIVE_CUSTOMERS_FAILURE',
    error,
    receivedAt: Date.now()
});





//user clicks on customers name
export const selectCustomerForDetails = (id) => ({ 
    type: 'SELECT_CUSTOMER_FOR_DETAILS',
    id
});

//fetches customer details
export const requestCustomerDetails = (id) => ({ 
    type: 'REQUEST_CUSTOMER_DETAILS',
    id
});

//recieve new customer details success
export const recieveCustomerDetailsSuccess = (id) => ({ 
    type: 'RECIEVE_CUSTOMER_DETAILS_SUCCESS',
    id
});

//recieve new customer details failure
export const recieveCustomerDetailsFailure = (error) => ({ 
    type: 'RECIEVE_CUSTOMER_DETAILS_FAILURE',
    error
});

//save customer details
export const saveCustomerDetails = (customersDetails) => ({ 
    type: 'SAVE_CUSTOMER_DETAILS',
    customersDetails
});

//create a new action creator that handles request failures
