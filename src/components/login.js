import React from 'react';
import { View, Text } from 'react-native';
import Header from './Header';
import LoginSubmitButtonContainer from '../containers/LoginSubmitButtonContainer';
import {FormLabel, FormInput} from 'react-native-elements';
import { createAuth } from '../utilities/createAuth';
import configureStore from '../store/configureStore';
import { Provider } from 'react-redux';
const store = configureStore();



export default class Login extends React.Component {
    
    constructor(props) {
        super(props);
        this.usernameInputChange = this.usernameInputChange.bind(this);
        this.passwordInputChange = this.passwordInputChange.bind(this);
        this.submitPressed = this.submitPressed.bind(this);
    }
    
    componentDidMount() {
        this.setState(() => ({uname: "", pwd: ""}));
    }

    usernameInputChange(text) {
        this.setState(() => ({uname: text}));
        console.log(this.state.uname);
    }

    passwordInputChange(text) {
        this.setState(() => ({pwd: text}));
        console.log(this.state.pwd);
    }

    submitPressed() {
        console.log(this.state);
    }


    render() {
        return (
            <Provider store={store}>
                <View>
                    <Header />
                    <FormLabel>User Name</FormLabel>
                    <FormInput 
                        onChangeText={
                                (text) => {
                                    this.setState({uname: text}, this.usernameInputChange);
                            }
                        }
                        textInputRef='username'
                    />
                    <FormLabel>Password</FormLabel>
                    <FormInput 
                    onChangeText={
                        (text) => {
                            this.setState({pwd: text}, this.passwordInputChange);
                    }
                } 
                        textInputRef='password'
                        secureTextEntry={true}
                    />
                    <LoginSubmitButtonContainer submitCallBack = {this.submitPressed}/>
                </View>
            </Provider>
        );
    }
    
};

