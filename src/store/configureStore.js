import { createStore, combineReducers, applyMiddleware } from 'redux';
import CustomersReducer from '../reducers/customers';
import CustomersDetails from '../reducers/customersDetails';
import CustomersFilter from '../reducers/customersFilter';
import currentCustomerAction from '../reducers/currentCustomerAction';
import activitiesReducer from '../reducers/activities';
import activitiesFilter from '../reducers/activitiesFilter';
import orgGuid from '../reducers/orgGuid';
import jwt from '../reducers/jwt';
import thunk from 'redux-thunk';

export default () => {
    return {
        store : {},
        createStore : () => {
            this.store = createStore(
                combineReducers({
                    customersData: CustomersReducer,
                    customersDetails: CustomersDetails,
                    currentCustomerAction: currentCustomerAction,
                    customersFilter: CustomersFilter,
                    activities: activitiesReducer,
                    activitiesFilter: activitiesFilter,
                    orgGuid,
                    jwt
                }), 
                applyMiddleware(thunk)
            );
            return this.store;
        },
        deleteStore : () => {
            this.store = {};
        }
    }
};