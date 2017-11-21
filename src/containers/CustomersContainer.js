import React from 'react';
import { connect } from 'react-redux';
import { addCustomerChunk, requestCustomers, receiveNewCustomers } from '../actions/customers';
import {  } from '../actions/customers';
import CustomersListNavigator from '../components/CustomersListNavigator';
import selectCustomers from '../selectors/customers';


const fetchCustomers = () => (
    fetch('https://randomuser.me/api/?results=50')
);

const asyncAction = (dispatch) => {
    
    return (dispatch) => {
        dispatch(requestCustomers());
        return fetchCustomers()
            .then(
                (customersObject) => customersObject.json(),
                (error) => dispatch(addCustomerChunk(error))
            ).then((customers) => {
                dispatch(receiveNewCustomers());
                return dispatch(addCustomerChunk(customers));
            })
            .catch((err) => dispatch(addCustomerChunk(err)))
    };
};


class CustomersListContainer extends React.Component {
    state = {
        customerChunk : ''
    }

    showLoadingSpinner() {
        //console.log(this.props.actions.isFetching);
        return this.props.actions.isFetching ? true : false;
    }

    constructor(props) {
        super(props);
        //console.log(this.props.actions.isFetching);
        this.showLoadingSpinner = this.showLoadingSpinner.bind(this);
    }

    componentWillMount() {
        this.setState(() => ({showSpinner: this.showLoadingSpinner}));
        this.setState(() => ({actions: this.props.actions}));
    }
    
   componentDidMount() {
       
        //console.log(this.props);
        
        setTimeout(() => {
            this.props.dispatch(asyncAction())
            .then(
                ({ customers }) => {
                    this.setState(() => ({customerChunk : this.props.allCustomers}));
                    
                });
        },5000);
        

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
            <CustomersListNavigator screenProps={ {customers: this.state.customerChunk, showSpinner: this.state.showSpinner, actions: this.state.actions} } nav={this.props.nav}/>
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