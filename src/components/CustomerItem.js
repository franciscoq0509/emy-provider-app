import React from 'react';
import { View, Text } from 'react-native';
import { ListItem } from 'react-native-elements';


export const CustomerItem = (props) => {
    console.log(props);
    return (
        <ListItem
            roundAvatar
            title={`${props.item.name.first} ${props.item.name.last}`}
            onPress={() => {props.item.navToCustomerDetails(props.item.registered)}}
        />
    );

};




