import { createSelector } from 'reselect';

const getTextMatch = (state) => state.customersFilter.text;
const customers = (state) => state.customersData.allCustomers;
const customersIds = (state) => state.customersData.allCustomerIds;

export const getFilteredCustomers = createSelector(
    [getTextMatch, customers, customersIds],
    (text, customers, allIds) => {
        console.log(text.length)
        if(allIds !== undefined && text.length !== 0) {
            //console.log('not undefined');
            let filteredCustomerObjects = [];
            allIds.filter((id) => {
                const textMatch = customers[id].full_name === null || customers[id].full_name.toLowerCase().search(text.toLowerCase());
                 if(textMatch >= 1) { filteredCustomerObjects[id] = customers[id] };
            });
            console.log(filteredCustomerObjects);
            console.log(text);
            return  filteredCustomerObjects;
        } else {console.log('else');console.log(customers);return customers;}
    }
)

// return allCustomers.filter((customer) => {
//     const textMatch = customer.first_name === null || customer.first_name.toLowerCase().includes(text.toLowerCase()) || 
//     customer.last_name === null || customer.last_name.toLowerCase().includes(text.toLowerCase());
//     return textMatch;

// export const getFilteredCustomers = createSelector(
//     [ getTextMatch, customers ],
//     (visibilityFilter, todos) => {
//       switch (visibilityFilter) {
//         case 'SHOW_ALL':
//           return todos
//         case 'SHOW_COMPLETED':
//           return todos.filter(t => t.completed)
//         case 'SHOW_ACTIVE':
//           return todos.filter(t => !t.completed)
//       }
//     }
//   )

