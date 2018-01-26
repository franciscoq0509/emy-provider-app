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
            <View style={ {flex: 1} }>
                <Header />
                {this.props.navigation.state.params && this.props.navigation.state.params.error ? 
                    <ErrorMessage message={'Sorry something has gone wrong. Please exit and restart this application before logging in again.'} errorStyle={'block'} />
                    : 
                    <View  style={styles.wrapper}>
                        {this.state.showError && <ErrorMessage message={this.state.message}  errorStyle={'bubble'}/>}
                        <View>
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

                            <Text style={styles.orgSelectHeader}>Select your organisation below</Text>

                            <Picker 
                                onValueChange={(itemValue,itemIndex)=>{setProviderGuid(itemValue); this.setState({orgSelected:itemValue})}}
                                selectedValue={this.state.orgSelected}> 
                                    <Picker.item label="PKC" value="pkc"/>
                                    <Picker.item label="Premium Kids Care" value='premium-kids-care'/>
                                    <Picker.item label="jerrys-gym" value='jerrys-gym'/>
                            </Picker>

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

// <View style={styles.checkboxWrapper}>
//                                 <CheckBox
//                                     textStyle={{fontSize: 10}}
//                                     center
//                                     title='PKC'
//                                     check-square-o='check-square-o'
//                                     uncheckedIcon='square-o'
//                                     onPress={
//                                         () => {
//                                             setProviderGuid('pkc');
//                                             this.setState({pkcChecked: true, premiumKidsCareChecked : false, jerrysGymChecked: false});
//                                         }
//                                     }
//                                     checked={this.state.pkcChecked}
//                                 />
        
//                                 <CheckBox
//                                     textStyle={{fontSize: 10}}
//                                     center
//                                     title='Premium Kids Care'
//                                     onPress={
//                                         () => {
//                                             setProviderGuid('premium-kids-care');
//                                             this.setState({pkcChecked: false, premiumKidsCareChecked : true, jerrysGymChecked: false});
//                                         }
//                                     }
//                                     checked={this.state.premiumKidsCareChecked}
//                                 />
        
//                                 <CheckBox
//                                     textStyle={{fontSize: 10}}
//                                     center
//                                     title='jerrys-gym'
//                                     onPress={
//                                         () => {
//                                             setProviderGuid('jerrys-gym');
//                                             this.setState({pkcChecked: false, premiumKidsCareChecked : false, jerrysGymChecked: true});
//                                         }
//                                     }
//                                     checked={this.state.jerrysGymChecked}
//                                 />
//                             </View>

const styles = {
    orgSelectHeader: {
        flexDirection: 'row',
        alignSelf: 'center',
        marginTop: 20
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
        paddingTop: 20,
        paddingLeft: 20,
        paddingRight: 20,
    },
    checkboxWrapper : {
        flexDirection: 'column',
        height: 60,
        marginBottom: 10
    },
    submitButtonWrapper: {
        marginTop: 110,
    }
};

