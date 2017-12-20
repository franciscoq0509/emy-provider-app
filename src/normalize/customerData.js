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
    console.log(customerDetails);
    const allCustomersDetails = new schema.Entity(customerDetails.id);
    const normalizedAll = new schema.Entity('allCustomersDetails', {
        allCustomersDetails
    });
    const normalizedAllDetails = normalize(customerDetails, normalizedAll);
console.log(normalizedAllDetails);

    let normalizedAddresses = {entities: {[customerDetails.id] : 0}};
    if('addresses' in customerDetails && 'data' in customerDetails.addresses) {
        const addressesSchema = new schema.Entity(customerDetails.id);
        const AddressesListSchema = [addressesSchema];
        normalizedAddresses.addresses = [...customerDetails.addresses.data];
        normalizedAddresses = normalize(normalizedAddresses.addresses, AddressesListSchema);
    }
console.log('addresses');
    let normalizedEmergency = {entities: {[customerDetails.id] : 0}};
    if('emergency_contacts' in customerDetails) {
        console.log('=======in emergency');
        const emergencySchema = new schema.Entity(customerDetails.id, {}, {idAttribute: 'emergency_contact_id'});
        const emergencyContactsList = [ emergencySchema ];
        normalizedEmergency = normalize(customerDetails.emergency_contacts, emergencyContactsList);
    }
console.log('emergency');
    let normalizedFamilyDoctors = {entities : {[customerDetails.id] : 0}};
    if('family_doctors' in customerDetails) {
        const familyDoctorSchema = new schema.Entity(customerDetails.id, {}, {idAttribute: 'family_doctor_id'});
        const familyDoctorsList = [ familyDoctorSchema ];
        normalizedFamilyDoctors = normalize(customerDetails.family_doctors, familyDoctorsList);
    }
console.log('doctors');
    let normalizedHealthInfo = {entities: {[customerDetails.id] : 0}};
    if ('healths' in customerDetails) {
        const healthSchema = new schema.Entity(customerDetails.id, {}, {idAttribute: 'user_id'}); 
        const healthList = [ healthSchema ];
        var healthData = [{...customerDetails.healths}];
        normalizedHealthInfo = normalize(healthData, healthList);
    }
console.log('health');
    let normalizedPhoneNumbers = {entities: {[customerDetails.id] : 0}};
    if( 'phones' in customerDetails && customerDetails.phones.length > 0 ) {
        const phoneSchema = new schema.Entity(customerDetails.id);
        const phoneList = [ phoneSchema ];
        normalizedPhoneNumbers = normalize(customerDetails.phones, phoneList);
    }
console.log('phones');
    let normalizedSchoolName = {[customerDetails.id] : 0};
    if( 'school_name' in customerDetails && customerDetails.school_name !== null ) {
        console.log('in');
        normalizedSchoolName[customerDetails.id] = customerDetails.school_name;
    }
    let normalizedSchoolYear = {[customerDetails.id] : null};
    if( 'school_year' in customerDetails && customerDetails.school_year !== null ) {
        console.log('in');
        normalizedSchoolYear[customerDetails.id] = customerDetails.school_year;
    }
    let normalizedParentAuthPickups = {[customerDetails.id] : 0};
    if('authorized_pickups' in customerDetails) {
        normalizedParentAuthPickups[customerDetails.id] = customerDetails.authorized_pickups.filter((key) => customerDetails.authorized_pickups[key] !== null);
    }
    console.log('======parent auth pick up');
    let normalizedProviderAuthPickups = {[customerDetails.id] : 0};
    if('provider_notes' in customerDetails && customerDetails.provider_notes !== null) {
        normalizedProviderAuthPickups[customerDetails.id] = customerDetails.provider_notes;
    }
    console.log('======provider auth pick up');
    let normalizedUnauthPickups = {[customerDetails] : 0};
    if('unauthorized_persons' in customerDetails && customerDetails.unauthorized_persons.any_unauthorized_persons !== 0) {
        console.log(customerDetails.unauthorized_persons);
        normalizedUnauthPickups[customerDetails.id] = customerDetails.unauthorized_persons;
        console.log(normalizedUnauthPickups);
    }
console.log(normalizedSchoolName);
    return {
        allDetails : normalizedAllDetails.entities.allCustomersDetails[customerDetails.id] ,
        addresses : normalizedAddresses.entities[customerDetails.id],
        emergencyContacts : normalizedEmergency.entities[customerDetails.id],
        familyDoctors : normalizedFamilyDoctors.entities[customerDetails.id],
        healthInfo : normalizedHealthInfo.entities[customerDetails.id],
        phoneNumbers : normalizedPhoneNumbers.entities[customerDetails.id],
        schoolName : normalizedSchoolName[customerDetails.id],
        schoolYear : normalizedSchoolYear[customerDetails.id],
        parentAuthPickups : normalizedParentAuthPickups[customerDetails.id],
        providerAuthPickups : normalizedProviderAuthPickups[customerDetails.id],
        unauthorizedPickups : normalizedUnauthPickups[customerDetails.id]
        
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