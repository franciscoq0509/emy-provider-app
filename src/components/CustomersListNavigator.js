import React from 'react';
import { FlatList } from 'react-native'
import { List } from 'react-native-elements';
import { CustomerItem } from './CustomerItem';
import { StackNavigator } from 'react-navigation';
import { CustomerFullDetails } from './CustomerFullDetails';
import StandardSearchbar from './StandardSearchbar'


class CustomersList extends React.Component {

    customersAndCallback() {
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
                    ListHeaderComponent={<StandardSearchbar search="allCustomers" />}
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