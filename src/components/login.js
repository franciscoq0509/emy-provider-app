import React from 'react';
import { View, Text } from 'react-native';
import Header from './Header';
import {FormLabel, FormInput} from 'react-native-elements';


const inputChange = (text) => {
    console.log(text);
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

