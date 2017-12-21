import React from 'react';
import { View, Text } from 'react-native';
import Header from './Header';
import { ErrorMessage } from './ErrorMessage';
import LoginSubmitButtonContainer from '../containers/LoginSubmitButtonContainer';
import {FormLabel, FormInput, CheckBox} from 'react-native-elements';
import { setProviderGuid } from '../config/_ENV_';

export default class Login extends React.Component {
    
    componentWillMount = () => {
        this.setState(() => ({
            uname: "", pwd: "", 
            showValidationError: false, 
            showNetworkError: false, 
            showUnknownError: false,
            pkcChecked : false,
            premiumKidsCareChecked : false,
            jerrysGymChecked : false,
            orgs : ['pkcChecked','premiumKidsCareChecked','jerrysGymChecked'] 
        }));
    }

    showErrorMessage = (err_message) => {
        if(typeof err_message === 'object' && Object.keys(err_message).length === 0) {
            console.log(err_message);
            this.setState({showError: true, message: `Network error!\nMake sure your device has an internet connection.`});
        } else {
            const errMessage = JSON.parse(err_message);
            if('error_description' in errMessage && errMessage.error_description.toLowerCase().includes('invalid username and password')) {
                this.setState({showError: true, message: `Sorry your username or password are incorrect.`});
            } else {
                this.setState({showError: true, message: `Woops! looks like something went wrong.`});
            }
        }

    }

    render() {
        return (
            <View style={ {flex: 1} }>
                <Header />
                {this.state.showError && <ErrorMessage message={this.state.message}  errorStyle={'bubble'}/>}
                <View  style={styles.wrapper}>
                    {
                        __DEV__ ?
                            <Text>dev</Text>
                        :
                        <Text>prod</Text>
                    }
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

                    <CheckBox
                        center
                        title='PKC'
                        check-square-o='check-square-o'
                        uncheckedIcon='square-o'
                        onPress={
                            () => {
                                console.log(this.state);
                                setProviderGuid('pkc');
                                this.setState({pkcChecked: true, premiumKidsCareChecked : false, jerrysGymChecked: false});
                            }
                        }
                        checked={this.state.pkcChecked}
                    />

                    <CheckBox
                        center
                        title='Premium Kids Care'
                        onPress={
                            () => {
                                console.log(this.state);
                                setProviderGuid('premium-kids-care');
                                this.setState({pkcChecked: false, premiumKidsCareChecked : true, jerrysGymChecked: false});
                            }
                        }
                        checked={this.state.premiumKidsCareChecked}
                    />

                    <CheckBox
                        center
                        title='jerrys-gym'
                        onPress={
                            () => {
                                console.log(this.state);
                                setProviderGuid('jerrys-gym');
                                this.setState({pkcChecked: false, premiumKidsCareChecked : false, jerrysGymChecked: true});
                            }
                        }
                        checked={this.state.jerrysGymChecked}
                    />

                    <View style={styles.submitButtonWrapper} >
                        <LoginSubmitButtonContainer 
                            
                            nav={this.props.navigation} 
                            uname={this.state.uname} 
                            pwd={this.state.pwd}
                            showErrorMessage={this.showErrorMessage}
                            orgSelected={this.state.orgs.filter((o)=>this.state[o]!==false)}
                        />
                    </View>
                    
                </View>
            </View>
        );
    }
    
};

const styles = {
    wrapper: {
        marginTop: 10,
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

