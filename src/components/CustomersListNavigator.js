import React from 'react';
import { FlatList, Text, ActivityIndicator, View } from 'react-native'
import { List } from 'react-native-elements';
import { CustomerItem } from './CustomerItem';
import { StackNavigator } from 'react-navigation';
import StandardSearchbar from './StandardSearchbar';
import CustomerFullDetailsContainer from '../containers/CustomerFullDetailsContainer';
import spinnerStyle from './styles/spinnerStyle';


class CustomersList extends React.Component {
    
    customersAndCallback() {
        console.log(this.props.screenProps);
        //return this.props.screenProps.customers !== "" ? this.props.screenProps.customers.map((customer) => ({...customer, customNavigator: this.props.navigation})) : "";
    };

    _keyExtractor = (item, index) => item.id;

    render() {
        return (
            <View  style={ center = {flex:1} }>
                
                {this.customersAndCallback()}
            </View>
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