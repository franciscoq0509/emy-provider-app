import { StackNavigator } from 'react-navigation';
import Login from '../components/login';

export const SignedOutNavigator = StackNavigator({
    LoginScreen: {
        screen: Login,
    }
});