import { AsyncStorage } from 'react-native';

// export const _ENV_ = () => {
//     if(__DEV__) {
//         return {
//             customersBasicUrl : (guid) =>`https://emy-front-api.craig.27s-dev.net/providers-api/v1/${guid}/users?full_name=%`,
//             customersBasicHeaders : (jwt) => ({
//                 headers: {
//                     Authorization: `Bearer ${jwt}`
//                 }
//             }),
//             customersFullUrl : (guid, id) => `https://emy-front-api.craig.27s-dev.net/providers-api/v1/${guid}/users/${id}?include_local_data=1`,
//             customersFullHeaders : (guid, jwt) => ({
//                 headers: {
//                     'Authorization': `Bearer ${jwt}`,
//                     'X-enrolmy-slug': guid
//                 }
//             })
//         }
//     } else {
//         return {
//             customersBasicUrl : (guid) =>`https://emy-front-api.craig.27s-dev.net/providers-api/v1/${guid}/users?full_name=%`,
//             customersBasicHeaders : (jwt) => ({
//                 headers: {
//                     Authorization: `Bearer ${jwt}`
//                 }
//             }),
//             customersFullUrl : (guid, id) => `https://emy-front-api.craig.27s-dev.net/providers-api/v1/${guid}/users/${id}?include_local_data=1`,
//             customersFullHeaders : (guid, jwt) => ({
//                 headers: {
//                     'Authorization': `Bearer ${jwt}`,
//                     'X-enrolmy-slug': guid
//                 }
//             })
//         }
//     }
// };


export const _ENV_ = () => {
    if(__DEV__) {
        console.log('using DEV 555555555');
        return {
            loginAPI : {
                url : 'https://login-dev.enrolmy.com',
                apiKey : 'Basic MW9wUExqTERmelF3WU05dzYwTDlFN3RoZXAxaHlhalc6TzdhY3VPM2VmNzMxVGVmdDM4aGxtMTBzT01pblo5UG40NTFsWTg0MHFWTU5odHNj'
            },
            customersBasicUrl : (guid) =>`https://emy-front-api.craig.27s-dev.net/providers-api/v1/${guid}/users?full_name=%`,
            customersBasicHeaders : (jwt) => ({
                headers: {
                    Authorization: `Bearer ${jwt}`
                }
            }),
            customersFullUrl : (guid, id) => `https://emy-front-api.craig.27s-dev.net/providers-api/v1/${guid}/users/${id}?include_local_data=1`,
            customersFullHeaders : (guid, jwt) => ({
                headers: {
                    'Authorization': `Bearer ${jwt}`,
                    'X-enrolmy-slug': guid
                }
            })
        }
    } 
    // USE THESE AS THE CONFIGURATION FOR TESTING THE APP
    // else {
    //     return {
    //         loginAPI : {
    //             url : 'https://login-dev.enrolmy.com',
    //             apiKey : 'Basic MW9wUExqTERmelF3WU05dzYwTDlFN3RoZXAxaHlhalc6TzdhY3VPM2VmNzMxVGVmdDM4aGxtMTBzT01pblo5UG40NTFsWTg0MHFWTU5odHNj'
    //         },
    //         customersBasicUrl : (guid) =>`https://emy-front-api.craig.27s-dev.net/providers-api/v1/${guid}/users?full_name=%`,
    //         customersBasicHeaders : (jwt) => ({
    //             headers: {
    //                 Authorization: `Bearer ${jwt}`
    //             }
    //         }),
    //         customersFullUrl : (guid, id) => `https://emy-front-api.craig.27s-dev.net/providers-api/v1/${guid}/users/${id}?include_local_data=1`,
    //         customersFullHeaders : (guid, jwt) => ({
    //             headers: {
    //                 'Authorization': `Bearer ${jwt}`,
    //                 'X-enrolmy-slug': guid
    //             }
    //         })
    //     }
    // } 
    // USE THESE AS THE CONFIGURATION FOR THE FINAL PROD VERSION

    else {
        return {
            loginAPI : {
                url : 'https://login-api.enrolmy.com',
                apiKey : 'Basic NXJVZGJYMDVyT2xUYzA1ZVgzN0hIWGpxTHZTQmpVVWc6QmU0SDU4eE0xcHZmeVpDNWhnaXJ1dzVMNm50Sks5SElIcEtPN1NqcktWd1JtVXJu'
            },
            customersBasicUrl : (guid) =>`https://api.enrolmy.com/providers-api/v1/${guid}/users?full_name=%`,
            customersBasicHeaders : (jwt) => ({
                headers: {
                    Authorization: `Bearer ${jwt}`
                }
            }),
            customersFullUrl : (guid, id) => `https://api.enrolmy.com/providers-api/v1/${guid}/users/${id}?include_local_data=1`,
            customersFullHeaders : (guid, jwt) => ({
                headers: {
                    'Authorization': `Bearer ${jwt}`,
                    'X-enrolmy-slug': guid
                }
            })
        }
    }

};



export let providerGuid = '';

export async function getProviderGuid() {
    if(providerGuid !== '') {
        return providerGuid
    } else {
        try {
            const storageGuid = await AsyncStorage.getItem('ORG_GUID');
            if (storageGuid !== null) {
                providerGuid = storageGuid;
                return storageGuid;
            }
            else {
                return false;
            }
        } catch (error) {
            return error;
        }
    }
}

export const setProviderGuid = (provider) => {
    switch (provider) {
        case 'jerrys-gym':
            AsyncStorage.setItem('ORG_GUID', '55790419-dbb4-43b4-9c1d-7bae0a37004f');
            providerGuid = '55790419-dbb4-43b4-9c1d-7bae0a37004f'
            break;
        case 'pkc':
        AsyncStorage.setItem('ORG_GUID', '588a865b-da6c-4d19-a8e4-612e0a4d0aec');
            providerGuid = '588a865b-da6c-4d19-a8e4-612e0a4d0aec'
            break;
        case 'premium-kids-care':
        AsyncStorage.setItem('ORG_GUID', '562963ca-14b0-44aa-aa64-790c0a4d0aec');
            providerGuid = '562963ca-14b0-44aa-aa64-790c0a4d0aec'
            break;
        default:
            providerGuid = '55790419-dbb4-43b4-9c1d-7bae0a37004f'
            break;
    }
};