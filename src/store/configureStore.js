import { createStore, combineReducers } from 'redux';
import CustomersReducer from '../reducers/customers';

export default () => {
    const store = createStore(CustomersReducer);

    return store;
}