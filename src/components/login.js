import React from 'react';
import { View, Text, ActivityIndicator, Picker } from 'react-native';
import Header from './Header';
import { ErrorMessage } from './ErrorMessage';
import LoginSubmitButtonContainer from '../containers/LoginSubmitButtonContainer';
import {FormLabel, FormInput, CheckBox} from 'react-native-elements';
import { setProviderGuid } from '../config/_ENV_';
import { _signUserOut } from '../utilities/userAuth';
import spinnerStyle from './styles/spinnerStyle';

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
                orgSelected: 'pck',
                orgs : ['pkcChecked','premiumKidsCareChecked','jerrysGymChecked'] 
            }));
    }

    showErrorMessage = (err_message) => {
        if(typeof err_message === 'object' && Object.keys(err_message).length === 0) {
            this.setState({showError: true, message: `Network error!\nMake sure your device has an internet connection.`});
        } else {
            try {
                const errMessage = JSON.parse(err_message);
                if('error_description' in errMessage && errMessage.error_description.toLowerCase().includes('invalid username and password')) {
                    this.setState({showError: true, message: `Sorry your username or password are incorrect.`});
                } else {
                    this.setState({showError: true, message: `Woops! looks like something went wrong.`});
                }
            } catch (err) {
                this.setState({showError: true, message: err_message});
            }
        }

    }

    render() {
        return this.state ? 
            <View style={ {flex: 1, backgroundColor: '#3197EA'} }>
                <Header />
                {this.props.navigation.state.params && this.props.navigation.state.params.error ? 
                    <ErrorMessage message={'Sorry something has gone wrong. Please exit and restart this application before logging in again.'} errorStyle={'block'} />
                    : 
                    <View  style={styles.wrapper}>
                        {this.state.showError && <ErrorMessage message={this.state.message}  errorStyle={'bubble'}/>}
                        <View>
                            <FormLabel labelStyle={{color: '#fff'}}>User Name</FormLabel>
                            <FormInput
                                inputStyle={styles.formField} 
                                containerStyle={styles.formWrapper}    
                                onChangeText={
                                    (text) => {
                                        this.setState({uname: text});
                                    }
                                }
                                textInputRef='username'
                            />
                            <FormLabel labelStyle={{color: '#fff'}}>Password</FormLabel>
                            <FormInput 
                            inputStyle={styles.formField}
                            containerStyle={styles.formWrapper}
                            onChangeText={
                                (text) => {
                                    this.setState({pwd: text});
                                }
                            } 
                                textInputRef='password'
                                secureTextEntry={true}
                            />

                            <Text style={styles.orgSelectHeader}>Select your organisation below</Text>
                            <View style={{backgroundColor: '#D9D9D9', width: '90%',
                            alignSelf: 'center', borderRadius: 4, marginTop: 10}}>
                                <Picker 
                                    onValueChange={(itemValue,itemIndex)=>{setProviderGuid(itemValue); this.setState({orgSelected:itemValue})}}
                                    selectedValue={this.state.orgSelected} 
                                    mode='dropdown'>
                                        <Picker.Item label="PKC" value="pkc" />
                                        <Picker.Item label="Premium Kids Care" value='premium-kids-care'/>
                                        <Picker.Item label="jerrys-gym" value='jerrys-gym'/>
                                </Picker>
                            </View>
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
                    
                }
                
            </View>
        :
        <View style={spinnerStyle.container}>
            <ActivityIndicator
                animating = {true}
                size = "large"
            />
        </View>
    }
    
};

const styles = {
    orgSelectHeader: {
        flexDirection: 'row',
        alignSelf: 'center',
        marginTop: 20,
        color:'#fff'
    },
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
        paddingTop: 0,
        paddingLeft: 20,
        paddingRight: 20,
    },
    formWrapper: {
        backgroundColor: "#D9D9D9", 
        borderRadius: 4, 
        height: 35
    },
    checkboxWrapper : {
        flexDirection: 'column',
        height: 60,
        marginBottom: 10
    },
    submitButtonWrapper: {
        marginTop: 20,
    }
};

