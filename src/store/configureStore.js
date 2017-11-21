import { createStore, combineReducers, applyMiddleware } from 'redux';
import CustomersReducer from '../reducers/customers';
import CustomersDetails from '../reducers/customersDetails';
import CustomersFilter from '../reducers/customersFilter';
import currentCustomerAction from '../reducers/currentCustomerAction';
import thunk from 'redux-thunk';

export default () => {
    const store = createStore(
        combineReducers({
            customersData: CustomersReducer,
            customersDetails: CustomersDetails,
            currentCustomerAction: currentCustomerAction,
            customersFilter: CustomersFilter
        }), 
        applyMiddleware(thunk)
    );

    return store;
}