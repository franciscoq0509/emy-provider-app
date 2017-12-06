import { schema, arrayOf, normalize } from 'normalizr';


export const normalizeBasicCustomerDetails =  (customersArray) => {
    const normalizedData = {};
    normalizedData.allCustomers = {};
    normalizedData.allCustomerIds = [];
    customersArray.map((customer) => {
        normalizedData.allCustomers[customer.id] = customer;
        normalizedData.allCustomerIds.push(customer.id);
    });
    return normalizedData;
    
}

export const normalizedFullCustomerDetails = (customerDetails) => {
    const allCustomersDetails = new schema.Entity(customerDetails.id);
    const normalizedAll = new schema.Entity('allCustomersDetails', {
        allCustomersDetails
    });
    const normalizedAllDetails = normalize(customerDetails, normalizedAll);

    let normalizedAddresses = {entities: {[customerDetails.id] : 0}};
    if('addresses' in customerDetails && 'data' in customerDetails.addresses) {
        console.log(customerDetails.addresses);
        const addressesSchema = new schema.Entity(customerDetails.id);
        const AddressesListSchema = [addressesSchema];
        normalizedAddresses.addresses = [...customerDetails.addresses.data];
        normalizedAddresses = normalize(normalizedAddresses.addresses, AddressesListSchema);
    }

    let normalizedEmergency = {entities : {[customerDetails.id] : 0}};
    if('emergency_contacts' in customerDetails) {
        const emergencySchema = new schema.Entity(customerDetails.id, {}, {idAttribute: 'emergency_contact_id'});
        const emergencyContactsList = [ emergencySchema ];
        normalizedEmergency = normalize(customerDetails.emergency_contacts, emergencyContactsList);
    }

    let normalizedFamilyDoctors = {entities : {[customerDetails.id] : 0}};
    if('family_doctors' in customerDetails) {
        const familyDoctorSchema = new schema.Entity(customerDetails.id, {}, {idAttribute: 'family_doctor_id'});
        const familyDoctorsList = [ familyDoctorSchema ];
        normalizedFamilyDoctors = normalize(customerDetails.family_doctors, familyDoctorsList);
    }

    let normalizedHealthInfo = {entities: {[customerDetails.id] : 0}};
    if ('healths' in customerDetails) {
        const healthSchema = new schema.Entity(customerDetails.id, {}, {idAttribute: 'user_id'}); 
        const healthList = [ healthSchema ];
        var healthData = [{...customerDetails.healths}];
        normalizedHealthInfo = normalize(healthData, healthList);
    }

    let normalizedPhoneNumbers = {entities: {[customerDetails.id] : 0}};
    if( 'phones' in customerDetails && customerDetails.phones.length > 0 ) {
        const phoneSchema = new schema.Entity(customerDetails.id);
        const phoneList = [ phoneSchema ];
        normalizedPhoneNumbers = normalize(customerDetails.phones, phoneList);
    }

    return {
        allDetails : normalizedAllDetails.entities.allCustomersDetails[customerDetails.id] ,
        addresses : normalizedAddresses.entities[customerDetails.id],
        emergencyContacts : normalizedAddresses.entities[customerDetails.id],
        familyDoctors : normalizedFamilyDoctors.entities[customerDetails.id],
        healthInfo : normalizedHealthInfo.entities[customerDetails.id],
        phoneNumbers : normalizedPhoneNumbers.entities[customerDetails.id]
    };
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