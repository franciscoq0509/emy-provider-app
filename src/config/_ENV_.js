export const _ENV_ = () => {
    if(__DEV__) {
        return {
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
    } else {
        return {
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
};

export let providerGuid = '';

export const setProviderGuid = (provider) => {
    switch (provider) {
        case 'jerrys-gym':
            providerGuid = '55790419-dbb4-43b4-9c1d-7bae0a37004f'
        case 'pkc':
            providerGuid = '588a865b-da6c-4d19-a8e4-612e0a4d0aec'
        case 'premium-kids-care':
            providerGuid = '562963ca-14b0-44aa-aa64-790c0a4d0aec '
        default:
            providerGuid = '55790419-dbb4-43b4-9c1d-7bae0a37004f'
    }
};