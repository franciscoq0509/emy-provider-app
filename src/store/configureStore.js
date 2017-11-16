import { createStore, combineReducers, applyMiddleware } from 'redux';
import CustomersReducer from '../reducers/customers';
import CustomersFilter from '../reducers/customersFilter';
import thunk from 'redux-thunk';

export default () => {
    const store = createStore(
        combineReducers({
            customersData: CustomersReducer, 
            customersFilter: CustomersFilter
        }), 
        applyMiddleware(thunk)
    );

    return store;
}