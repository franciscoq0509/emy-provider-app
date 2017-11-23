import React from 'react';
import { connect } from 'react-redux';
import { requestCustomers, receiveNewCustomers, receiveCustomersError } from '../actions/customers';
import {  } from '../actions/customers';
import CustomersListNavigator from '../components/CustomersListNavigator';
//import selectCustomers from '../selectors/customers';
import { getFilteredCustomers } from '../selectors/index';



const fetchCustomers = () => (
    fetch(
        //'https://emy-front-api.craig.27s-dev.net/providers-api/v1/55790419-dbb4-43b4-9c1d-7bae0a37004f/users?full_name=%'
        //'https://front-api.enrolmy.com/activities-api/v1/activities'
        'https://front-api.enrolmy.com/providers-api/v1/55790419-dbb4-43b4-9c1d-7bae0a37004f/users'
    )
);

const asyncAction = (dispatch) => {
    
    return (dispatch) => {
        dispatch(requestCustomers());
        return fetchCustomers()
            .then(
                (customersObject) => customersObject.json(),
                (error) => dispatch(receiveCustomersError(error))
            ).then((customers) => {
                console.log(customers);
                return dispatch(receiveNewCustomers(customers.users));
            })
            .catch((err) => dispatch(receiveCustomersError(err)))
    };
};


class CustomersListContainer extends React.Component {
    state = {
        customerChunk : ''
    }

    showLoadingSpinner() {
        return this.props.actions.isFetching ? true : false;
    }

    constructor(props) {
        super(props);
        this.showLoadingSpinner = this.showLoadingSpinner.bind(this);
    }

    componentWillMount() {
        this.setState(() => ({showSpinner: this.showLoadingSpinner}));
    }
    
    componentDidMount() {   
    this.props.dispatch(asyncAction())
		.then(
            ({ customers }) => {
                this.setState(() => ({customers : this.props.allCustomers}));
                this.setState(() => ({filteredCustomers : this.props.filteredCustomers}));
            });
    }

	componentWillReceiveProps(nextProps) { 
		if(this.props !== nextProps) {
			this.setState(() => ({customers : nextProps.allCustomers}));
		}
	}

    render() {      
        return (
            <CustomersListNavigator screenProps={ {customers: this.state.customers, filteredCustomers: this.state.filteredCustomers, showSpinner: this.state.showSpinner} } nav={this.props.nav}/>
        );
    };
};

const mapStateToProps = (state) => {
    console.log(state);
    return {
        filteredCustomers: getFilteredCustomers(state, state),//selectCustomers(state.customersData.allCustomers, state.customersFilter),
        allCustomers: state.customersData.allCustomers,
        actions: state.currentCustomerAction 
    };
};

export default connect(mapStateToProps)(CustomersListContainer);