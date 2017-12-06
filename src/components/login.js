import React from 'react';
import { View, Text } from 'react-native';
import Header from './Header';
import { ErrorMessage } from './ErrorMessage';
import LoginSubmitButtonContainer from '../containers/LoginSubmitButtonContainer';
import {FormLabel, FormInput} from 'react-native-elements';


export default class Login extends React.Component {
    
    componentWillMount = () => {
        this.setState(() => ({uname: "", pwd: "", showValidationError: false, showNetworkError: false, showUnknownError: false}));
    }

    submitPressed = () => {
        console.log(this.state);
    }

    showErrorMessage = (err_message) => {
        console.log(err_message);
        console.log(typeof err_message);
        if(typeof err_message === 'object' && Object.keys(err_message).length === 0) {
            this.setState({showNetworkError: true, showValidationError: false, showUnknownError: false});
        } else {
            console.log('error happened');
            const errMessage = JSON.parse(err_message);
            if('error_description' in errMessage && errMessage.error_description.toLowerCase().includes('invalid username and password')) {
                //showValidationError
                this.setState({showValidationError: true, showNetworkError: false, showUnknownError: false});
            } else {
                //someothererror
            }
            console.log(errMessage);
        }

    }

    render() {
        console.log(this.props);
        return (
            <View style={ {flex: 1} }>
                <Header />
                <View  style={styles.wrapper}>
                    <FormLabel>User Name</FormLabel>
                    <FormInput
                        inputStyle={styles.formField} 
                        onChangeText={
                            (text) => {
                                this.setState({uname: text});
                            }
                        }
                        textInputRef='username'
                    />
                    <FormLabel>Password</FormLabel>
                    <FormInput 
                    inputStyle={styles.formField} 
                    onChangeText={
                        (text) => {
                            this.setState({pwd: text});
                        }
                    } 
                        textInputRef='password'
                        secureTextEntry={true}
                    />
                    <View style={styles.submitButtonWrapper} >
                        <LoginSubmitButtonContainer 
                            
                            nav={this.props.navigation} 
                            uname={this.state.uname} 
                            pwd={this.state.pwd}
                            showErrorMessage={this.showErrorMessage}
                        />
                    </View>
                    {this.state.showNetworkError && <ErrorMessage type={'network'}/>}
                    {this.state.showValidationError && <ErrorMessage type={'validation'}/>}
                    
                </View>
            </View>
        );
    }
    
};

const styles = {
    wrapper: {
        marginTop: 50,
        flex: 1,
        flexDirection: 'column',
        //alignItems: 'center',
        justifyContent: 'flex-start',
        //alignSelf: 'center'
    },
    formField: {
        //marginTop: 50,
        paddingTop: 20,
        paddingLeft: 20,
        paddingRight: 20,
    },
    submitButtonWrapper: {
        marginTop: 40,
    }
};

