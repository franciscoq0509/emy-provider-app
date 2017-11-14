import React from 'react';
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
                (customersObject) => customersObject.json(),
                (error) => dispatch(addCustomerChunck(error))
            ).then((customers) => {
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
                    console.log(this.props.customers.allCustomers);
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
    console.log(state);
    return {
        customers: state //selectCustomers from /selectors/selectCustomers
    };
};

export default connect(mapStateToProps)(CustomersListContainer);