import React from 'react';
import { View, Text, FlatList } from 'react-native'
import { List } from 'react-native-elements';
import { connect } from 'react-redux';
import { addCustomerChunck } from '../actions/customers';
import { CustomerItem } from './CustomerItem';
import { StackNavigator, createNavigator, createNavigationContainer, NavigationActions, addNavigationHelpers } from 'react-navigation';
import { CustomerFullDetails } from './CustomerFullDetails';


class CustomersList extends React.Component {

    customersAndCallback() {
        console.log('in create object');
        console.log(this.props);
        return this.props.screenProps.customers !== "" ? this.props.screenProps.customers.map((customer) => ({...customer, customNavigator: this.props.navigation})) : "";
    };

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

const CustomersListNavigator = StackNavigator({
    mainList: {
        screen: CustomersList,
        navigationOptions: {
            customers: this.props
        }
    },
    fullDetail: {
        screen: CustomerFullDetails,
    }
});



export default CustomersListNavigator;