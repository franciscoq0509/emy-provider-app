import { schema, arrayOf, normalize } from 'normalizr';


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
    const generalCustomersDetails = new schema.Entity('generalCustomersDetails');
    console.log(customerDetails);  
    const n = new schema.Entity('generalCustomersDetails', {
        generalCustomersDetails
    });
    const normData = normalize(customerDetails, n);
    console.log(normData);

    let normalizedAddresses = {};
    let extractAddresses = {addresses: []};
    if('data' in customerDetails.addresses) {
        console.log('data exists');
        extractAddresses.addresses = [...customerDetails.addresses.data];

    }
    console.log(extractAddresses);
    let addressesSchema = new schema.Entity('addresses');
    if(extractAddresses.addresses.length > 0) {
        let addressesSchema = {
            [extractAddresses.addresses]: [addressesSchema]
        }
        normalizedAddresses = normalize(extractAddresses, addressesSchema);
        console.log(normalizedAddresses);
    }
    
}

//might need an entitiy with user uuid and user_id

//full details all keyed by id

//generalCustomersDetails
//addresses --
//custom questions
//educations
//emergency contacts --
//ethnic groups
//family doctors --
//health information --
//phones --
//residency status
//unauthorized persons
//user client permissions
//