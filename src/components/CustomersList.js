import React from 'react';
import { View, Text, FlatList } from 'react-native'
import { List } from 'react-native-elements';
import { connect } from 'react-redux';
import { addCustomerChunck } from '../actions/customers';
import { CustomerItem } from './CustomerItem';

class CustomersList extends React.Component {
    
    navToCustomerDetails = (id) => {
        console.log('user clicked', id);
        console.log(this.props);
    };
    customersAndCallback() {
        console.log('in create object');
        console.log(this.props);
        return this.props.customers !== "" ? this.props.customers.map((customer) => ({...customer, navToCustomerDetails : this.navToCustomerDetails})) : "";
    };
    //console.log(propsAndNav);
    _keyExtractor = (item, index) => item.registered;
    render() {
        return (
            <List> 
                <FlatList
                    data={this.customersAndCallback()}
                    renderItem={CustomerItem}
                    keyExtractor={this._keyExtractor}
                />
            </List>
        );
    }
    
};


export default CustomersList;