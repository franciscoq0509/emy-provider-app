import { Schema, arrayOf, normalize } from 'normalizr';


export default (customersArray) => {
    const normalized = {};
    customersArray.map((customer) => {
        normalized[customer.id] = customer;
        //return; 
    });
    return normalized;
    
}