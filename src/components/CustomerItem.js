import React from 'react';
import { View, Text } from 'react-native';
import { ListItem } from 'react-native-elements';
import { addNavigationHelpers } from 'react-navigation';

export const CustomerItem = (props) => {
    return (
        <ListItem
            roundAvatar
            title={`${props.item.name.first} ${props.item.name.last}`}
            onPress={() => {props.item.customNavigator.navigate('fullDetail', { customer: props.item })}}
        />

        
    );

};



