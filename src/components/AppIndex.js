import React from 'react';
import { SignedOutNavigator } from '../navigator/SignedOutNavigator';
import RootNavigator from '../navigator/RootNavigator'
import { _checkUserLoggedIn } from '../utilities/userAuth';


export default class App extends React.Component {
    //return either SignedOutNavigator if not signed in
    //or RootNav if already signed in.

    constructor(props) {
        super(props);

        this.state = {
            signedIn: false,
            checkedSignedIn: false
        };
    }

    componentWillMount() {
        _checkUserLoggedIn()
            .then(isSignedIn => this.setState({signedIn: isSignedIn, checkedSignedIn: true}))
            .catch(err => alert('error'));
    }

    render() {
        const { checkedSignedIn, signedIn } = this.state;

        if(!checkedSignedIn) {
            return null;
        }

        if(signedIn) {
            return <RootNavigator />
        } else {
            return <SignedOutNavigator />
        }
    }
}