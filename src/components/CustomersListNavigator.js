import React from 'react';
import { FlatList, Text, ActivityIndicator, View } from 'react-native'
import { List } from 'react-native-elements';
import { CustomerItem } from './CustomerItem';
import { StackNavigator } from 'react-navigation';
import StandardSearchbar from './StandardSearchbar';
import CustomerFullDetailsContainer from '../containers/CustomerFullDetailsContainer';
import spinnerStyle from './styles/spinnerStyle';


class CustomersList extends React.PureComponent {
    
    customersAndCallback() {
        //console.log(this.props.screenProps.filteredCustomers);
        return (this.props.screenProps.filteredCustomers !== undefined && 
            this.props.screenProps.filteredCustomers.length !== 0) ? this.props.screenProps.filteredCustomers : []; //.map((customer) => ({...customer, customNavigator: this.props.navigation}))
    };

    _keyExtractor = (item, index) => index;

    render() {
        return (
            <View  style={ center = {flex:1} }>
                
                {this.props.screenProps.showSpinner() ? 
                    <View style={spinnerStyle.container}>
                        <ActivityIndicator
                            animating = {true}
                            size = "large"
                        />
                    </View>
                    : 
                    <List> 
                        <FlatList
                            data={this.customersAndCallback()}
                            initialNumToRender={5}
                            renderItem={CustomerItem}
                            keyExtractor={this._keyExtractor}
                            ListHeaderComponent={<StandardSearchbar search="allCustomers" />}
                        />
                    </List>
                }
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