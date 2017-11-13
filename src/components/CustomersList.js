import React from 'react';
import { View, Text, FlatList } from 'react-native'
import { List } from 'react-native-elements';
import { connect } from 'react-redux';
import { addCustomerChunck } from '../actions/customers';
import { CustomerItem } from './CustomerItem';
import { StackNavigator, createNavigator, createNavigationContainer, NavigationActions, addNavigationHelpers } from 'react-navigation';
import { CustomerFullDetails } from './CustomerFullDetails';





 const CustomersNavigation = createNavigator(navigator)(CustomersList);
 addNavigationHelpers(CustomersNavigation);

// const NavigateToFullDetails = NavigationActions.navigate({
//     routeName: 'fullDetail',
//     params: {},
// });


class CustomersList extends React.Component {

    static _navigator = StackNavigator({
        fullDetail: {
            screen: CustomerItem,
        }
    });

    constructor (props) {
        super(props);
        addNavigationHelpers(CustomersNavigation);
    }
    
    
    
    navToCustomerDetails = (id) => {
        console.log('user clicked', id);
        //console.log(this.props);
        //this.props.nav.navigate('fullDetail', { id });
        //CustomersNavigation('fullDetail')
        //this.props.nav.dispatch(NavigateToFullDetails);
        
        console.log(CustomersNavigation);
    };
    customersAndCallback() {
        console.log('in create object');
        console.log(this.props);
        return this.props.customers !== "" ? this.props.customers.map((customer) => ({...customer, navToCustomerDetails : this.navToCustomerDetails, customNavigator: CustomersList._navigator})) : "";
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