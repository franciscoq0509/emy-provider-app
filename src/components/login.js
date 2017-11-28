import React from 'react';
import { View, Text } from 'react-native';
import Header from './Header';
import {FormLabel, FormInput} from 'react-native-elements';
import { createAuth } from '../utilities/createAuth';


const inputChange = (text) => {
    console.log(text);
    createAuth('jerrys@gymowner.cxm', 'L#N#marlin28');
}

export const login = () => (
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
);

