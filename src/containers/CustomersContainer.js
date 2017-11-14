import React from 'react';
import { View, Text } from 'react-native'
import { connect } from 'react-redux';
import { addCustomerChunck } from '../actions/customers';
import CustomersListNavigator from '../components/CustomersListNavigator';


const fetchCustomers = () => (
    fetch('https://randomuser.me/api/?results=50')
);

const asyncAction = (dispatch) => {
    return (dispatch) => {
        return fetchCustomers()
            .then(
                (customersObject) => {
                    //console.log(customersObject);
                    return customersObject.json();
                },
                (error) => dispatch(addCustomerChunck(error))
            ).then((customers) => {
                //console.log(customers);
                return dispatch(addCustomerChunck(customers));
            })
            .catch((err) => dispatch(addCustomerChunck(err)))
    };
};


class CustomersListContainer extends React.Component {
    state = {
        customerChunk : ''
    }
   componentDidMount() {
        this.props.dispatch(asyncAction())
            .then(
                ({ customers }) => {
                    this.setState(() => ({customerChunk : this.props.customers.allCustomers}));
                    console.log(this.props);
                });

        // setTimeout(() => {
        //     this.props.dispatch(asyncAction())
        //     .then(
        //         ({ customers }) => {
        //             this.setState(() => ({customerChunk : this.props.customers.allCustomers}));
        //             console.log(this.props);
        //         });
        // }, 6000);
   }

    render() {
        return (
            <CustomersListNavigator screenProps={ {customers: this.state.customerChunk} } nav={this.props.nav}/>
        );
    };
};

const mapStateToProps = (state) => {
    return {
        customers: state
    };
};

export default connect(mapStateToProps)(CustomersListContainer);