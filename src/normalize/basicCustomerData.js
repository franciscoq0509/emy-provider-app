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
    const allCustomersDetails = new schema.Entity('allCustomersDetails');
    console.log(customerDetails);  
    const n = new schema.Entity('allCustomersDetails', {
        allCustomersDetails
    });
    const normData = normalize(customerDetails, n);
    console.log(normData);
/////////
    let extractAddresses = {addresses: []};
    const addressesSchema = new schema.Entity('addresses');
    const AddressesListSchema = [addressesSchema];
    if('data' in customerDetails.addresses) {
        console.log('data exists');
        extractAddresses.addresses = [...customerDetails.addresses.data];
    }
    const normalizedAddresses = normalize(extractAddresses.addresses, AddressesListSchema);
    console.log(normalizedAddresses);
////////
    const emergencySchema = new schema.Entity('emergencyContacts', {}, {idAttribute: 'emergency_contact_id'});
    const emergencyContactsList = [ emergencySchema ];
    const normalizedEmergency = normalize(customerDetails.emergency_contacts, emergencyContactsList);
    console.log(normalizedEmergency);
    
}

//might need an entitiy with user uuid and user_id

//full details all keyed by id

//allCustomersDetails
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