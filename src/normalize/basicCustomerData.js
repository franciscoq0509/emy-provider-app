import { Schema, arrayOf, normalize } from 'normalizr';


export const normalizeBasicCustomerDetails =  (customersArray) => {
    const normalizedData = {};
    normalizedData.allCustomers = {};
    normalizedData.allCustomerIds = [];
    customersArray.map((customer) => {
        normalizedData.allCustomers[customer.id] = customer;
        normalizedData.allCustomerIds.push(customer.id);
        //return; 
    });
    //console.log(normalizedData);
    return normalizedData;
    
}

export const normalizedFullCustomerDetails = (customerDetails) => {

}

//might need an entitiy with user uuid and user_id

//full details all keyed by id

//generalCustomersDetails
//addresses
//custom questions
//educations
//emergency contacts
//ethnic groups
//family doctors
//health information
//phones
//residency status
//unauthorized persons
//user client permissions
//