import React from 'react';
import { FlatList, Text, ActivityIndicator, View } from 'react-native'
import { List, Button, Icon } from 'react-native-elements';
import { CustomerItem } from './CustomerItem';
import { StackNavigator } from 'react-navigation';
import StandardSearchbar from './StandardSearchbar';
import CustomerFullDetailsContainer from '../containers/CustomerFullDetailsContainer';
import spinnerStyle from './styles/spinnerStyle';
import { ErrorMessage } from './ErrorMessage';
import { userCancelledDetailsRequest } from '../actions/customers';
import ModalDropDown from 'react-native-modal-dropdown';


class CustomersList extends React.Component {

    static navigationOptions = ({ navigation }) => {
        const { params = {} } = navigation.state;
        let headerRight = ( 
                
                <ModalDropDown 
                    options={['logout']} 
                    dropdownTextStyle = {{fontSize: 20}}
                    dropdownStyle = {{backgroundColor: '#D9D9D9', borderColor:  'black'}}
                    defaultValue = '. . .'
                    textStyle={{fontSize: 25, color: '#fff', marginRight: 20, }}
                    adjustFrame={(obj) => {
                        obj.width = '30%';
                        obj.top += 15;
                        obj.height -= 117;
                        return obj;
                    }}
                    onSelect={(index, value) => {
                        switch (value) {
                            case 'logout':
                                params.logout()
                                break;
                            default:
                                return false;
                        }
                    }}
                />
            );

        return { headerRight, title: 'All Customers' };
    };

    componentDidMount() {
        this.props.navigation.setParams({logout: this.logout})
    }


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
    
    componentWillUpdate() {
        this.props.screenProps.dispatch(userCancelledDetailsRequest());
    }
    
    _keyExtractor = (item, index) => index;

    render() {
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
                );
            default:
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
                                <StandardSearchbar search="allCustomers" />
                                <List>
                                    <FlatList
                                        data={this.customersAndCallback()}
                                        initialNumToRender={30}
                                        onEndReachedThreshold={1200}
                                        renderItem={CustomerItem}
                                        keyExtractor={this._keyExtractor}
                                        getItemLayout={(data, index) => (
                                            {length: 50, offset: 50 * index, index}
                                          )}
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
            customers: this.props,
            headerStyle: {backgroundColor:'#2196F3'},
            headerTintColor: '#fff',
        }
    },
    fullDetail: {
        screen: CustomerFullDetailsContainer,
        navigationOptions: {
            headerStyle: {backgroundColor:'#2196F3'},
            headerTintColor: '#fff',
        }
    }
});


export default CustomersListNavigator;