import { StackNavigator } from 'react-navigation';
import Login from '../components/login';

console.log('in signed out nav');

export const SignedOutNavigator = StackNavigator({
    LoginScreen: {
        screen: Login,
    }
});