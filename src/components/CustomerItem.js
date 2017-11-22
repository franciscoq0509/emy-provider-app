import React from 'react';
import { View, Text } from 'react-native';
import { ListItem } from 'react-native-elements';
import { addNavigationHelpers } from 'react-navigation';

export const CustomerItem = (props) => {
    return (
        <ListItem
        containerStyle={props.item.is_child ? {} : {backgroundColor: '#e6f4f4'}}
            roundAvatar
            title={`${props.item.first_name} ${props.item.last_name}`}
            onPress={() => {props.item.customNavigator.navigate('fullDetail', { customerId : props.item.registered })}}
        />
    );

};



