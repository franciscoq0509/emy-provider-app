import { createSelector } from 'reselect';

const getTextMatch = (state) => state.customersFilter.text;
const customers = (state) => state.customersData.allCustomers;
const customersIds = (state) => state.customersData.allCustomerIds;

export const getFilteredCustomers = createSelector(
    [getTextMatch, customers, customersIds],
    (text, customers, allIds) => {
        //console.log(text);
        if(allIds !== undefined && text.length !== 0) {
            let filteredCustomerObjects = [];
            allIds.filter((id) => {
                const textMatch = customers[id].full_name === null || customers[id].full_name.toLowerCase().search(text.toLowerCase());
                 if(textMatch >= 0) { filteredCustomerObjects[id] = customers[id] };
            });
            return  filteredCustomerObjects;
        } else return customers;
    }
)

