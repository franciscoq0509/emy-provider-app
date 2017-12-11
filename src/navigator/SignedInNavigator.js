import React from 'react';
import { View, Button, Image } from 'react-native';
import { TabNavigator, addNavigationHelpers } from 'react-navigation';
import { Provider } from 'react-redux';
import CustomersContainer from '../containers/CustomersContainer';
import Header from '../components/Header'; 
import ActivitiesContainer from '../containers/ActivitiesContainer';
import QuickBook from '../components/QuickBook';
import { Icon } from 'react-native-elements';


// const HomeScreen = ({ navigation }) => {
//     const homeButtons = [
//         {title: 'Customers', navigateTo: 'Customers'},
//     ];
//     return (
//         <View>
//             <Header />
//             {homeButtons.map(({ title, navigateTo }, index) => 
//                 <Button
//                     key={index} 
//                     title={title} 
//                     onPress={() => navigation.navigate('Customers')}
//                 />
//             )}
//         </View>
//     );
// };

class CustomersScreen extends React.Component {
    render() {
        return (
            <CustomersContainer nav={this.props}/>
        );
    }  
};

class ActivitiesScreen extends React.Component {
    render() {
        return(
        <View>
            <ActivitiesContainer />
        </View>
        );
    };  
};

const QuickBookScreen = () => (
    <View>
        <Header />
        <QuickBook />
    </View>
);

const SignedInNavigator = TabNavigator({
    // Home: {
    //     screen: HomeScreen,
    // },
        Customers: {
            screen: CustomersScreen,
            navigationOptions: {
                headerTitle: 'All Customers',
                tabBarIcon: () => (
                    <Icon name='users' type='entypo'/>
                  ),
                header: {visible: false}
            },
        },
        Activities: {
            screen: ActivitiesScreen,
            navigationOptions: {
                headerTitle: 'All Activities',
                tabBarIcon: () => (
                    <Icon name='clipboard' type='entypo'/>
                  ),
            }
        },
        QuickBook: {
            screen: QuickBookScreen,
            navigationOptions: {
                headerTitle: 'Quick Book',
                tabBarIcon: () => (
                    <Icon name='book' type='entypo'/>
                  ),
            }
        }
    },
    {   
        initialRouteName: "Activities",
        animationEnabled: false,
        lazy: true,
        swipeEnabled: false   
    }

);

addNavigationHelpers(SignedInNavigator);

export default SignedInNavigator;