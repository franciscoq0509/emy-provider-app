import React from 'react';
import { SignedOutNavigator } from '../navigator/SignedOutNavigator';
import SignedInNavigator from '../navigator/SignedInNavigator'
import { _checkUserLoggedIn } from '../utilities/userAuth';
import { createRootNavigator } from '../navigator/RootNavigator';
import configureStore from '../store/configureStore';
import { Provider } from 'react-redux';

const store = configureStore();

export default class App extends React.Component {
    //return either SignedOutNavigator if not signed in
    //or RootNav if already signed in.

    constructor(props) {
        super(props);

        this.state = {
            signedIn: false,
            checkedSignedIn: false
        };

        _checkUserLoggedIn()
        .then(v => {
            console.log(v);
        });
    }
    
    render() {
        const { checkedSignedIn, signedIn } = this.state;
        console.log('in render', checkedSignedIn);
        if(checkedSignedIn) {
            return null;
        }

        const Layout = createRootNavigator(signedIn);

        return (
            <Provider store={store}>
                <Layout />
            </Provider>
        );
        
    }
}