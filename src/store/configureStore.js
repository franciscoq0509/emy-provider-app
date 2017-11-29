import { createStore, combineReducers, applyMiddleware } from 'redux';
import CustomersReducer from '../reducers/customers';
import CustomersDetails from '../reducers/customersDetails';
import CustomersFilter from '../reducers/customersFilter';
import currentCustomerAction from '../reducers/currentCustomerAction';
import activitiesReducer from '../reducers/activities';
import jwt from '../reducers/jwt';
import thunk from 'redux-thunk';

export default () => {
    const store = createStore(
        combineReducers({
            customersData: CustomersReducer,
            customersDetails: CustomersDetails,
            currentCustomerAction: currentCustomerAction,
            customersFilter: CustomersFilter,
            activities: activitiesReducer,
            jwt
        }), 
        applyMiddleware(thunk)
    );

    return store;
}