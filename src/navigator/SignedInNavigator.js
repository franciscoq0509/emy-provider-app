import React from 'react';
import { View, Button, Image } from 'react-native';
import { TabNavigator, addNavigationHelpers } from 'react-navigation';
import { Provider } from 'react-redux';
import CustomersContainer from '../containers/CustomersContainer';
import Header from '../components/Header'; 
import ActivitiesNavigator from '../components/ActivitiesNavigator';
import QuickBook from '../components/QuickBook';
import { Icon } from 'react-native-elements';
import Login from '../components/login';
import { SignedOutNavigator } from './SignedOutNavigator';


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
            <CustomersContainer rootNav={this.props.screenProps.rootNav}/>
        );
    }  
};

// class ActivitiesScreen extends React.Component {
//     render() {
//         return(
//             <ActivitiesNavigator />
//         );
//     };  
// };

// const QuickBookScreen = () => (
//     <View>
//         <Header />
//         <QuickBook />
//     </View>
// );

const SignedInNavigator = TabNavigator({
    // Home: {
    //     screen: HomeScreen,
    // },
        Customers: {
            screen: CustomersScreen,
            navigationOptions: {
                tabBarVisible: false,
                headerTitle: 'All Customers',
                tabBarIcon: () => (
                    <Icon name='users' type='entypo'/>
                  )
            },
        },
        // Activities: {
        //     screen: ActivitiesScreen,
        //     navigationOptions: {
        //         headerTitle: 'All Activities',
        //         tabBarIcon: () => (
        //             <Icon name='clipboard' type='entypo'/>
        //           ),
        //     }
        // },
        // QuickBook: {
        //     screen: QuickBookScreen,
        //     navigationOptions: {
        //         headerTitle: 'Quick Book',
        //         tabBarIcon: () => (
        //             <Icon name='book' type='entypo'/>
        //           ),
        //     }
        // }
    },
    {   
        initialRouteName: "Customers",
        animationEnabled: false,
        lazy: true,
        swipeEnabled: false   
    }

);

//addNavigationHelpers(SignedInNavigator);

export default SignedInNavigator;