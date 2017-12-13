import { createSelector } from 'reselect';

const getCustomersTextMatch = (state) => state.customersFilter.text;
const customers = (state) => state.customersData.allCustomers;
const customersIds = (state) => state.customersData.allCustomerIds;

const getActivitiesTextMatch = (state) => {
    return state.activitiesFilter.text;
}
const activities = (state) => state.activities.allActivities;
const activityIds = (state) => state.activities.allActivityIds;


export const getFilteredCustomers = createSelector(
    [getCustomersTextMatch, customers, customersIds],
    (text, customers, allIds) => {
        if(allIds !== undefined && text.length !== 0) {
            let filteredCustomerObjects = [];
            allIds.filter((id) => {
                const textMatch = customers[id].full_name === null || customers[id].full_name.toLowerCase().search(text.toLowerCase());
                 if(textMatch >= 0) { filteredCustomerObjects[id] = customers[id] };
            });
            return  filteredCustomerObjects;
        } else return customers;
    }
);

export const getFilteredActivities = createSelector(
    [getActivitiesTextMatch, activities, activityIds],
    (text, activities, allIds) => {
        if(allIds !== undefined && text.length !== 0) {
            let filteredActivityObjects = [];
            allIds.filter((id) => {
                const textMatch = activities[id].name === null || activities[id].name.toLowerCase().search(text.toLowerCase());
                 if(textMatch >= 0) { filteredActivityObjects[id] = activities[id] };
            });
            return  filteredActivityObjects;
        } else return activities;
    }
);