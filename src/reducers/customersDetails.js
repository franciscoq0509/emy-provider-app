const stateInit = {
    allDetails : {},
    addresses : {},
    emergencyContacts : {},
    familyDoctors : {},
    healthInfo : {},
    phoneNumbers : {},
    customerDetailsError : ""
};

export default (state = stateInit, action) => {
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