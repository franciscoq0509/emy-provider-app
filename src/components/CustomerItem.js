import React from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { ListItem } from 'react-native-elements';
import { addNavigationHelpers } from 'react-navigation';
import spinnerStyle from './styles/spinnerStyle';

export const CustomerItem = (props) => {
    return (
        <View>
        {
            props.item !== undefined ?
                <ListItem
                    containerStyle={props.item.is_child ? {} : {backgroundColor: '#e6f4f4'}}
                    roundAvatar
                    title={`${props.item.first_name} ${props.item.last_name}`}
                    onPress={() => {props.item.nav.navigate('fullDetail', { customerId : props.item.id })}}
                />
            :
            <View></View>
        }
        </View>
    );

};



