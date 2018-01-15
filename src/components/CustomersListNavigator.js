import React from 'react';
import { FlatList, Text, ActivityIndicator, View } from 'react-native'
import { List, Button } from 'react-native-elements';
import { CustomerItem } from './CustomerItem';
import { StackNavigator } from 'react-navigation';
import StandardSearchbar from './StandardSearchbar';
import CustomerFullDetailsContainer from '../containers/CustomerFullDetailsContainer';
import spinnerStyle from './styles/spinnerStyle';
import { ErrorMessage } from './ErrorMessage';


class CustomersList extends React.PureComponent {
    
    customersAndCallback() {
        console.log(this.props);
        const filteredCustomers = (this.props.screenProps.filteredCustomers !== undefined) ? [...Object.values(this.props.screenProps.filteredCustomers)] : []; 
        return filteredCustomers.length !== 0 ? filteredCustomers.map(c => ({...c, nav: {...this.props.navigation}})) : filteredCustomers;
    };
    
    _keyExtractor = (item, index) => index;

    render() {
        console.log('custom list nav');
        switch (this.props.screenProps.showLoadError) {
            case true:
            console.log('show load error');
                return (
                    <View>
                        <Button
                            containerViewStyle = {{width: 80, alignSelf: 'flex-end'}}
                            small
                            backgroundColor='#74CC82'
                            title='logout'
                            onPress={() => this.props.screenProps.errorLogout()}
                        />
                        <ErrorMessage message={'Sorry we cannot find the resource you are looking for'} errorStyle={'block'} />
                    </View>
                )
            default:
            console.log('default');
            console.log(this.props.screenProps.showSpinner());
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
                            
                            <View>
                                <View>{console.log('rendering logout button and flatlist')}</View> 
                                <Button
                                    containerViewStyle = {{width: 80, alignSelf: 'flex-end'}}
                                    small
                                    backgroundColor='#4CAF50'
                                    title='logout'
                                    onPress={() => this.props.screenProps.errorLogout()}
                                />
                                <List> 
                                    <FlatList
                                        data={this.customersAndCallback()}
                                        initialNumToRender={10}
                                        onEndReachedThreshold={1200}
                                        renderItem={CustomerItem}
                                        keyExtractor={this._keyExtractor}
                                        ListHeaderComponent={<StandardSearchbar search="allCustomers" />}
                                    />
                                </List> 
                            </View>
                        }
                    </View>
                );
        }
        
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