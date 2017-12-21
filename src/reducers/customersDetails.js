const stateInit = {
    allDetails : {},
    addresses : {},
    emergencyContacts : {},
    familyDoctors : {},
    healthInfo : {},
    phoneNumbers : {},
    schoolInformation: {
        schoolName : {},
        schoolYear : {}
    },
    parentAuthorizedPickups: {},
    providerAuthorizedPickups: {},
    providerUnauthorizedPickups: {},
    parentUnauthorizedPickups: {},
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
                    [action.id] : action.normalizedCustomerDetails.emergencyContacts
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
                    },
                    schoolYear : {
                        ...state.schoolInformation.schoolYear,
                        [action.id] : action.normalizedCustomerDetails.schoolYear
                    }
                },
                parentAuthorizedPickups : {
                    ...state.parentAuthorizedPickups,
                    [action.id] : action.normalizedCustomerDetails.parentAuthPickups
                },
                providerAuthorizedPickups : {
                    ...state.providerAuthorizedPickups,
                    [action.id] : action.normalizedCustomerDetails.providerAuthPickups
                },
                providerUnauthorizedPickups : {
                    ...state.providerUnauthorizedPickups,
                    [action.id] : action.normalizedCustomerDetails.providerUnauthorizedPickups || 0
                },
                parentUnauthorizedPickups : {
                    ...state.parentUnauthorizedPickups,
                    [action.id] : action.normalizedCustomerDetails.parentUnauthorizedPickups || 0
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