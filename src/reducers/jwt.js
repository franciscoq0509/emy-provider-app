const stateInit = {
    fullJwt: "",
    headers: "",
    payload: "",
    sig: "",
}

export default (state = stateInit, action) => {
    console.log(state);
    switch (action.type) {
        case 'SAVE_NEW_JWT':
        console.log(action.fullJwt);
            return jwt = {
                fullJwt: action.fullJwt,
                headers: action.headers,
                payload: action.payload,
                sig: action.sig,
            };
            
        default:
        console.log(state);
           return state;
    }
};


// export default (state = stateInit, action) => {
//     switch (action.type) {
//         case 'RECEIVE_CUSTOMERS_SUCCESS':
//             return {
//                 allCustomers: action.allCustomers !== undefined ? {...state.allCustomers, ...action.allCustomers} : {...state.allCustomers},
//                 allCustomerIds: action.allCustomerIds,
//                 receivedAt:  action.receivedAt
//             };
//         default:
//             return state;
//     }   
// };

