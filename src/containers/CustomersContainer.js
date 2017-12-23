import React from 'react';
import { connect } from 'react-redux';
import { requestCustomers, receiveNewCustomers, receiveCustomersError } from '../actions/customers';
import CustomersListNavigator from '../components/CustomersListNavigator';
import { getFilteredCustomers } from '../selectors/index';
import { _ENV_, providerGuid } from '../config/_ENV_';
import { deleteJwt } from '../actions/jwt';


const ENV = null;


const fetchCustomers = (jwt) => {
    console.log(`${ENV.customersBasicUrl(providerGuid)}`, ENV.customersBasicHeaders(jwt));
    return fetch(
        ENV.customersBasicUrl(providerGuid),ENV.customersBasicHeaders(jwt)
    )
};



class CustomersListContainer extends React.Component {


    customersThunk = (dispatch) => {
        
        return (dispatch) => {
            dispatch(requestCustomers());
            return fetchCustomers(this.props.jwt)
                .then(
                    (customersObject) => customersObject.json(),
                    (error) => dispatch(receiveCustomersError(error))
                ).then((customers) => {
                    return dispatch(receiveNewCustomers(customers.users));
                })
                .catch((err) => dispatch(receiveCustomersError(err)))
        };
    };

    showLoadingSpinner = () => {
        return this.props.actions.isFetching ? true : false;
    }

    componentWillMount() {
        console.log(this.props);
        //this.props.nav.navigation.navigate('ErrorLogout');
        ENV = _ENV_();
        this.setState(() => ({showSpinner: this.showLoadingSpinner, showLoadError: false}));
        this.props.dispatch(this.customersThunk())
        .then(
            (resp) => { 
                if('type' in resp) {
                    console.log(resp);
                    if(resp.type === 'RECEIVE_CUSTOMERS_SUCCESS') {
                        this.setState({showLoadError: false});
                        this.setState(() => ({filteredCustomers : this.props.filteredCustomers}));        
                    } else {
                        //error here
                        this.setState({showLoadError: true});
                    }

                } else {
                    //error here
                    this.setState({showLoadError: true});
                }
                this.setState(() => ({filteredCustomers : this.props.filteredCustomers}));
            })
            .catch((err) => {console.log(`this is the customers errer ${err}`); this.setState({showLoadError: true});})

    }

    goToLogin = () => {
        console.log('error clicked');
        console.log(this.props);
        this.props.nav.navigation.navigate('ErrorLogout', {error: 'exit'});
        //this.props.dispatch(deleteJwt());
        
    }

	componentWillReceiveProps(nextProps) {
        console.log(nextProps); 
		if(this.props !== nextProps) {
            this.setState(() => ({filteredCustomers : nextProps.filteredCustomers}));
		}
	}

    render() {      
        return (
            <CustomersListNavigator 
                screenProps = { 
                    {   
                        customers: this.state.customers, 
                        filteredCustomers: this.state.filteredCustomers, 
                        showSpinner: this.state.showSpinner,
                        showLoadError: this.state.showLoadError,
                        errorLogout : this.goToLogin
                    } 
                } 
                nav={this.props.nav}
            />
        );
    };
};

const mapStateToProps = (state) => ({
    filteredCustomers: getFilteredCustomers(state, state, state),
    actions: state.currentCustomerAction,
    jwt: state.jwt.fullJwt 
    
});

export default connect(mapStateToProps)(CustomersListContainer);