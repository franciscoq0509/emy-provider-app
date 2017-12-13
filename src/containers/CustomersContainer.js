import React from 'react';
import { connect } from 'react-redux';
import { requestCustomers, receiveNewCustomers, receiveCustomersError } from '../actions/customers';
import CustomersListNavigator from '../components/CustomersListNavigator';
import { getFilteredCustomers } from '../selectors/index';




const fetchCustomers = (jwt) => {
    console.log(jwt);
    return fetch(
        'https://emy-front-api.craig.27s-dev.net/providers-api/v1/55790419-dbb4-43b4-9c1d-7bae0a37004f/users?full_name=%&limit=200',
        {headers: {Authorization: `Bearer ${jwt}`}}
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
        console.log('##########in customers container############');
        this.setState(() => ({showSpinner: this.showLoadingSpinner, showLoadError: false}));
        console.log(this.props);
        this.props.dispatch(this.customersThunk())
        .then(
            (resp) => { 
                console.log(resp);
                if('type' in resp) {
                    if(resp.type === 'RECEIVE_CUSTOMERS_SUCCESS') {
                        console.log('success');
                        this.setState({showLoadError: false});
                        this.setState(() => ({filteredCustomers : this.props.filteredCustomers}));        
                    } else {
                        console.log('error recieving customers');
                        //error here
                        this.setState({showLoadError: true});
                    }

                } else {
                    //error here
                    console.log('error something went wroing');
                    this.setState({showLoadError: true});
                }
                this.setState(() => ({filteredCustomers : this.props.filteredCustomers}));
            })
            .catch((err) => {console.log(`this is the customers errer ${err}`); this.setState({showLoadError: true});})

    }

	componentWillReceiveProps(nextProps) { 
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
                        showLoadError: this.state.showLoadError
                    } 
                } 
                nav={this.props.nav}
            />
        );
    };
};

const mapStateToProps = (state) => {
    console.log(state);
    return {
        filteredCustomers: getFilteredCustomers(state, state, state),
        actions: state.currentCustomerAction,
        jwt: state.jwt.fullJwt 
    };
};

export default connect(mapStateToProps)(CustomersListContainer);