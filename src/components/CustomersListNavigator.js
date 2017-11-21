import React from 'react';
import { FlatList, Text } from 'react-native'
import { List } from 'react-native-elements';
import { CustomerItem } from './CustomerItem';
import { StackNavigator } from 'react-navigation';
import StandardSearchbar from './StandardSearchbar';
import CustomerFullDetailsContainer from '../containers/CustomerFullDetailsContainer';


class CustomersList extends React.Component {

    customersAndCallback() {
        return this.props.screenProps.customers !== "" ? this.props.screenProps.customers.map((customer) => ({...customer, customNavigator: this.props.navigation})) : "";
    };

    _keyExtractor = (item, index) => item.registered;
    render() {
        console.log(this.props.screenProps);
        return (
            <List> 
                <Text>still trying</Text>
                {this.props.screenProps.actions !== undefined &&  this.props.screenProps.actions.isFetching ?
                    <Text>spinningspinningspinningspinningspinningspinningspinningspinningspinningspinningspinningspinningspinningspinningspinningspinningspinningspinning</Text>
                    : 
                    
                    <FlatList
                        data={this.customersAndCallback()}
                        renderItem={CustomerItem}
                        keyExtractor={this._keyExtractor}
                        ListHeaderComponent={<StandardSearchbar search="allCustomers" />}
                    />
                
                }
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
        screen: CustomerFullDetailsContainer,
    }
});



export default CustomersListNavigator;