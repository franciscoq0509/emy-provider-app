import React from 'react';
import { View, Text } from 'react-native'
import { connect } from 'react-redux';
import { addCustomerChunck } from '../actions/customers';
import CustomersList from '../components/CustomersList';


const fetchCustomers = () => (
    fetch('https://randomuser.me/api/?results=100')
);

const asyncAction = (dispatch) => {
    return (dispatch) => {
        return fetchCustomers()
            .then(
                (customersObject) => {
                    console.log(customersObject);
                    return customersObject.json();
                },
                (error) => dispatch(addCustomerChunck(error))
            ).then((customers) => {
                console.log(customers);
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
                ({ newChunk }) => {
                    console.log(newChunk.results);
                    this.setState(() => ({customerChunk : newChunk.results}));
                })
        setTimeout(() => console.log(this.props.customers[0].results[0].name.first), 3000);
   }

    

    render() {
        return (
            <View>
                <CustomersList customers={this.state.customerChunk}/>
            </View>
        );
    };
    

};

const mapStateToProps = (state) => {
    return {
        customers: state
    };
};

export default connect(mapStateToProps)(CustomersListContainer);