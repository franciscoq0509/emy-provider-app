const stateInit = {
    allDetails : {},
    addresses : {},
    emergencyContacts : {},
    familyDoctors : {},
    healthInfo : {},
    phoneNumbers : {},
    schoolInformation: {},
    authorizedPickups: {},
    unauthorizedPickups: {},
    customerDetailsError : ""
};

export default (state = stateInit, action) => {
    console.log('action.normalizedCustomerDetails', action.normalizedCustomerDetails);
    switch (action.type) {
        case 'SAVE_FULL_CUSTOMER_DETAILS':
            return {
                allDetails : {
                    ...state.allDetails,
                    [action.id] : action.normalizedCustomerDetails.allDetails
                },
                addresses : {
                    ...state.addresses,
                    [action.id] : action.normalizedCustomerDetails.addresses
                },
                emergencyContacts : {
                    ...state.emergencyContacts,
                    [action.id] : action.normalizedCustomerDetails.emeregencyContacts
                },
                familyDoctors : {
                    ...state.familyDoctors,
                    [action.id] : action.normalizedCustomerDetails.familyDoctors
                },
                healthInfo : {
                    ...state.healthInfo,
                    [action.id] : action.normalizedCustomerDetails.healthInfo
                },
                phoneNumbers : {
                    ...state.phoneNumbers,
                    [action.id] : action.normalizedCustomerDetails.phoneNumbers
                },
                schoolInformation : {
                    ...state.schoolInformation,
                    schoolName : {
                        ...state.schoolInformation.schoolName,
                        [action.id]: action.normalizedCustomerDetails.schoolName,
                        //schoolYear: action.normalizedCustomerDetails.school_year,
                    }
                }
            
            };
        case 'SAVE_CUSTOMER_DETAILS_FAILED' :
            return {
                ...state,
                customerDetailsError : action.customersDetails
            }
        default:
            return state;
    }   
};