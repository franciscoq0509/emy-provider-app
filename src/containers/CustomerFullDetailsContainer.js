import React from 'react';
import { Text } from 'react-native';
import { connect } from 'react-redux';
import { CustomerFullDetails } from '../components/CustomerFullDetails';
import { saveCustomerDetails } from '../actions/customers';

const fetchCustomerDetails = (id) => {
    //use id to req user data fro API
    console.log(id);
    return fetch('https://randomuser.me/api/')
};

const returnCustomerDetails = (id) => {
    console.log(id);
    return (dispatch) => {
        return fetchCustomerDetails(id)
            .then(
                (details) => details.json(),
                (err) => dispatch(saveCustomerDetails(err.json()))
            )
            .then(
                (customerDetailsObject) => {
                    const customerDetails = customerDetailsObject.results[0]
                    dispatch(saveCustomerDetails(customerDetails))
                }
            )
            .catch((err) => dispatch(saveCustomerDetails(err)));
    } ;
};


class CustomerDetails extends React.Component {

    componentDidMount() {
        console.log(this.props);
        this.props.dispatch(returnCustomerDetails(this.props.navigation.state.params.customerId))
            .then((customer) => console.log(customer))
            .catch((err) => {console.log(err)})
    }

    render(){
        console.log(this.props);
        return (
            <Text>here in container</Text>
        );
    };
};

const mapStateToProps = (state) => {
    console.log(state);
    return {
        customers: state.allCustomers
    }
};

export default connect(mapStateToProps)(CustomerDetails);