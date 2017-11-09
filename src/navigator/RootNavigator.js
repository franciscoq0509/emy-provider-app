import React from 'react';
import { View, Button } from 'react-native';
import { StackNavigator, TabNavigator } from 'react-navigation';
//import App from '../App';
import CustomersList from '../components/CustomersList';
import Header from '../components/Header'; 
import ActivitiesList from '../components/ActivitiesList';
import QuickBook from '../components/QuickBook';


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

const CustomersScreen = () => (
    <View>
        <Header />
        <CustomersList />
    </View>
);

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

export default RootNavigator;