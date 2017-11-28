import React from 'react';
import { View, Text } from 'react-native';
import Header from './Header';
import {FormLabel, FormInput} from 'react-native-elements';
import { createAuth } from '../utilities/createAuth';
import configureStore from '../store/configureStore';
import { Provider } from 'react-redux';
const store = configureStore();

const inputChange = (text) => {
    console.log(text);
    createAuth('jerrys@gymowner.cxm', 'L#N#marlin28');
}

export const Login = () => (
    <Provider store={store}>
    <View>
        <Header />
        <FormLabel>User Name</FormLabel>
        <FormInput 
            onChangeText={inputChange} 
            textInputRef='username'
        />
        <FormLabel>Password</FormLabel>
        <FormInput 
            onChangeText={inputChange} 
            textInputRef='password'
            secureTextEntry={true}
        />
    </View>
    </Provider>
);

