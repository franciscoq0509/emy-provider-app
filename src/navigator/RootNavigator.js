import React from 'react';
import { View, Button, Text } from 'react-native';
import { StackNavigator, TabNavigator, addNavigationHelpers } from 'react-navigation';
import { connect, Provider } from 'react-redux';
import CustomersContainer from '../containers/CustomersContainer';
import Header from '../components/Header'; 
import ActivitiesList from '../components/ActivitiesList';
import QuickBook from '../components/QuickBook';
import addCustomerChunck from '../actions/customers';
import configureStore from '../store/configureStore';

const store = configureStore();


const HomeScreen = ({ navigation }) => {
    const homeButtons = [
        {title: 'Customers', navigateTo: 'Customers'},
    ];
    return (
        <View>
            <Header />
            {homeButtons.map(({ title, navigateTo }, index) => 
                <Button
                    key={index} 
                    title={title} 
                    onPress={() => navigation.navigate('Customers')}
                />
            )}
        </View>
    );
};

class CustomersScreen extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <CustomersContainer nav={this.props}/>
            </Provider>
        );
    }
    
};

const ActivitiesScreen = () => (
    <View>
        <Header />
        <ActivitiesList />
    </View>
);

const QuickBookScreen = () => (
    <View>
        <Header />
        <QuickBook />
    </View>
);

const RootNavigator = TabNavigator({
    Home: {
        screen: HomeScreen,
    },
    Customers: {
        screen: CustomersScreen,
        navigationOptions: {
            headerTitle: 'All Customers'
        }
    },
    Activities: {
        screen: ActivitiesScreen,
        navigationOptions: {
            headerTitle: 'All Activities'
        }
    },
    QuickBook: {
        screen: QuickBookScreen,
        navigationOptions: {
            headerTitle: 'Quick Book'
        }
    }
});

addNavigationHelpers(RootNavigator);

export default RootNavigator;