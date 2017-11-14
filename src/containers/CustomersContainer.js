import React from 'react';
import { connect } from 'react-redux';
import { addCustomerChunck } from '../actions/customers';
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
            <CustomersListNavigator screenProps={ {customers: this.state.customerChunk} } nav={this.props.nav}/>
        );
    };
};

const mapStateToProps = (state) => {
    return {
        allCustomers: selectCustomers(state.allCustomers, state.customersFilter)
    };
};

export default connect(mapStateToProps)(CustomersListContainer);