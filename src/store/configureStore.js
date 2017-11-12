import { createStore, combineReducers, applyMiddleware } from 'redux';
import CustomersReducer from '../reducers/customers';
import thunk from 'redux-thunk';

export default () => {
    const store = createStore(CustomersReducer, applyMiddleware(thunk));

    return store;
}