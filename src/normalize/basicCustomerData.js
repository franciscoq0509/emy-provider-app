import { Schema, arrayOf, normalize } from 'normalizr';


export default (customersArray) => {
    const normalizedData = {};
    normalizedData.allCustomers = {};
    normalizedData.allCustomerIds = [];
    customersArray.map((customer) => {
        normalizedData.allCustomers[customer.id] = customer;
        normalizedData.allCustomerIds.push(customer.id);
        //return; 
    });
    console.log(normalizedData);
    return normalizedData;
    
}