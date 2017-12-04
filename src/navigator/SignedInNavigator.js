import React from 'react';
import { View, Button } from 'react-native';
import { TabNavigator, addNavigationHelpers } from 'react-navigation';
import { Provider } from 'react-redux';
import CustomersContainer from '../containers/CustomersContainer';
import Header from '../components/Header'; 
import ActivitiesContainer from '../containers/ActivitiesContainer';
import QuickBook from '../components/QuickBook';


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

const ActivitiesScreen = () => (
    <View>
        <ActivitiesContainer />
    </View>
);

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
    },
    {   
        initialRouteName: "Customers"   
        
    }

);

addNavigationHelpers(SignedInNavigator);

export default SignedInNavigator;