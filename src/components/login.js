import React from 'react';
import { View, Text } from 'react-native';
import Header from './Header';
import LoginSubmitButtonContainer from '../containers/LoginSubmitButtonContainer';
import {FormLabel, FormInput} from 'react-native-elements';
import configureStore from '../store/configureStore';
import { Provider } from 'react-redux';

const store = configureStore();



export default class Login extends React.Component {
    
    componentWillMount = () => {
        this.setState(() => ({uname: "", pwd: ""}));
    }

    //when the below functions are used as callbacks for this.setState in render JSX, it breaks the props sent to LoginSubmitButtonContainer
    //after the below functions are executed.
    // usernameInputChange = (text) => {
    //     this.setState(() => ({uname: text}));
    //     //console.log(this.state.uname);
    // }

    // passwordInputChange = (text) => {
    //     this.setState(() => ({pwd: text}));
    //     //console.log(this.state.pwd);
    // }

    submitPressed = () => {
        console.log(this.state);
    }


    render() {
        console.log(store.getState());
        return (
            <Provider store={store}>
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

                        <LoginSubmitButtonContainer style={styles.submitButtonWrapper} submitCallBack = {this.submitPressed} uname={this.state.uname} pwd={this.state.pwd}/>
                    </View>
                </View>
            </Provider>
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
        paddingBottom: 20
    },
    submitButtonWrapper: {
        paddingTop: 40,
    }
};

