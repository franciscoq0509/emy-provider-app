import React from 'react';
import { Text, View } from 'react-native';
import { connect } from 'react-redux';
import { CustomerFullDetails } from '../components/CustomerFullDetails';
import { saveCustomerDetails } from '../actions/customers';

const fetchCustomerDetails = (id) => {
    //use id to req user data fro API
    //console.log(id);
    return fetch('https://randomuser.me/api/')
};

const returnCustomerDetails = (id) => {
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
        this.props.dispatch(returnCustomerDetails(this.props.navigation.state.params.customerId))
            .then(() => 
                {
                    this.setState(() => ({customerData: this.props.customerData})) 
                })
            .catch((err) => {console.log(err)})
    }

    render(){
        return (
            <View>
                { this.state && <CustomerFullDetails {...this.state.customerData} />}
            </View>
        );
    };
};

//getting customerData below will be empty at the point of passing it in as props to CustomerDetails
//but the point of it is once the customer data has been fetched and saved to store, we have direct access to it via this.props.customerData
//Because we cannot access the store directly in our component, we have to pass access to it through props.
const mapStateToProps = (state) => {
    return {
        customerData: state.customersData.customerDetails
    }
};

export default connect(mapStateToProps)(CustomerDetails);