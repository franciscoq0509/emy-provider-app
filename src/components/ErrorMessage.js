import React from 'react';
import { View, Text } from 'react-native';

export const ErrorMessage = ({ type }) => {
    switch (type) {
        case 'validation':
            return (
                <View>
                    <Text>Sorry seems that your username or password are incorrect</Text>       
                </View>
            )
        default:
            return (
                <View>
                    <Text>An error occured</Text>
                </View>
            )
    }
    
}