import React from 'react';
import { FlatList, Text, ActivityIndicator, View } from 'react-native'
import { List, Button } from 'react-native-elements';
import { CustomerItem } from './CustomerItem';
import { StackNavigator } from 'react-navigation';
import StandardSearchbar from './StandardSearchbar';
import CustomerFullDetailsContainer from '../containers/CustomerFullDetailsContainer';
import spinnerStyle from './styles/spinnerStyle';
import { ErrorMessage } from './ErrorMessage';


class CustomersList extends React.Component {
    constructor(props) {
        super(props);
        this.logout = this.logout.bind(this);
    }
    
    customersAndCallback() {
        const filteredCustomers = (this.props.screenProps.filteredCustomers !== undefined) ? [...Object.values(this.props.screenProps.filteredCustomers)] : []; 
        return filteredCustomers.length !== 0 ? filteredCustomers.map(c => ({...c, nav: {...this.props.navigation}})) : filteredCustomers;
    };

    logout = () => {
        this.props.screenProps.errorLogout();
    }
    
    _keyExtractor = (item, index) => index;

    render() {
        console.log('about to render show spinner or flat list');
        switch (this.props.screenProps.showLoadError) {
            case true:
                return (
                    <View>
                        <Button
                            containerViewStyle = {{width: 80, alignSelf: 'flex-end'}}
                            small
                            backgroundColor='#74CC82'
                            title='logout'
                            onPress={this.logout}
                        />
                        <ErrorMessage message={'Sorry we cannot find the resource you are looking for'} errorStyle={'block'} />
                    </View>
                )
            default:
                return (
                    <View  style={ center = {flex:1} }>
                        {this.props.screenProps.showSpinner() ? 
                            <View style={spinnerStyle.container}>
                            <Text>{console.log('rendering loading screen')}</Text>
                                <ActivityIndicator
                                    animating = {true}
                                    size = "large"
                                />
                            </View>
                            :
                            
                            <View>
                            <Text>{console.log('trying to render flatlist')}</Text>
                                <Button
                                    containerViewStyle = {{width: 80, alignSelf: 'flex-end'}}
                                    small
                                    backgroundColor='#4CAF50'
                                    title='logout'
                                    onPress={this.logout}
                                />
                                <List>
                                    <FlatList
                                        data={this.customersAndCallback()}
                                        initialNumToRender={30}
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