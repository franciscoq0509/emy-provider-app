import React from 'react';
import { connect } from 'react-redux';
import { addCustomerChunk } from '../actions/customers';
import { requestCustomers } from '../actions/customers';
import CustomersListNavigator from '../components/CustomersListNavigator';
import selectCustomers from '../selectors/customers';


const fetchCustomers = () => (
    fetch('https://randomuser.me/api/?results=50')
);

const asyncAction = (dispatch) => {
    return (dispatch) => {
        return fetchCustomers()
            .then(
                (customersObject) => customersObject.json(),
                (error) => dispatch(addCustomerChunk(error))
            ).then((customers) => {
                return dispatch(addCustomerChunk(customers));
            })
            .catch((err) => dispatch(addCustomerChunk(err)))
    };
};


class CustomersListContainer extends React.Component {
    state = {
        customerChunk : ''
    }
   componentDidMount() {
        this.props.dispatch(requestCustomers);
        console.log(this.props);
        this.setState(() => ({actions: this.props.actions}));
        this.props.dispatch(asyncAction())
            .then(
                ({ customers }) => {
                    this.setState(() => ({customerChunk : this.props.allCustomers}));
                    
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

   componentWillReceiveProps(nextProps) {
       if(this.props !== nextProps) {
        this.setState(() => ({customerChunk : nextProps.allCustomers}));
       }
   }

    render() {      
        return (
            <CustomersListNavigator screenProps={ {customers: this.state.customerChunk, actions: this.state.actions} } nav={this.props.nav}/>
        );
    };
};

const mapStateToProps = (state) => {
    console.log(state);
    return {
        allCustomers: selectCustomers(state.customersData.allCustomers, state.customersFilter),
        actions: state.currentCustomerAction 
    };
};

export default connect(mapStateToProps)(CustomersListContainer);