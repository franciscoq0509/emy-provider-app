import React from 'react';
import { Text, View } from 'react-native';
import { connect } from 'react-redux';
import { CustomerFullDetails } from '../components/CustomerFullDetails';
import { saveCustomerDetails } from '../actions/customers';

const fetchCustomerDetails = (id, jwt) => {
    //use id to req user data fro API
    //console.log(id);
    return fetch(`https://front-api.enrolmy.com/providers-api/v1/55790419-dbb4-43b4-9c1d-7bae0a37004f/users/${id}`, {headers: {Authorization: `Bearer ${jwt}`}})
};

const returnCustomerDetails = (id, jwt) => {
    return (dispatch) => {
        return fetchCustomerDetails(id, jwt)
            .then(
                (details) => details.json(),
                (err) => dispatch(saveCustomerDetails(err.json()))
            )
            .then(
                (customerDetailsObject) => {
                    dispatch(saveCustomerDetails(customerDetailsObject))
                }
            )
            .catch((err) => dispatch(saveCustomerDetails(err)));
    } ;
};


class CustomerDetails extends React.Component {
    componentWillMount() {
        console.log(this.props);
        this.setState(() => ({
                customerData: this.props.screenProps.filteredCustomers[this.props.navigation.state.params.customerId]
            })
        );
        this.props.dispatch(returnCustomerDetails(this.props.navigation.state.params.customerId, this.props.fullJwt))
            .then(() => 
                {
                    this.setState(() => ({allCustomerDetails: this.props.allCustomerDetails, id: this.props.navigation.state.params.customerId})) 
                    console.log(this.props);
                })
            .catch((err) => {console.log(err)})
    }

    render(){
        console.log(this.state);
        return (
            <View>
                { this.state.id && <CustomerFullDetails {...this.state.allCustomerDetails[this.state.id]} />}
            </View>
        );
    };
};

const mapStateToProps = (state) => {
    console.log(state);
    return {
        customerData: state.allCustomers,
        allCustomerDetails: state.customersDetails,
        fullJwt: state.jwt.fullJwt
    }
};

export default connect(mapStateToProps)(CustomerDetails);