import { SignedOutNavigator } from './signedOutNavigator';
import SignedInNavigator from './SignedInNavigator';
import { StackNavigator } from 'react-navigation';
import Login from '../components/login';


export const createRootNavigator = (signedIn = false) => {
    return StackNavigator({
        SignedIn: {
            screen: SignedInNavigator,
            navigationOptions: {
                gesturesEnabled: false
            }
        },
        SignedOut: {
            screen: Login,
            navigationOptions: {
                gesturesEnabled: false
            }
        },
    },
        {
            headerMode: "none",
            mode: "modal",
            initialRouteName: signedIn ? "SignedIn" : "SignedOut"
        }
    );
}