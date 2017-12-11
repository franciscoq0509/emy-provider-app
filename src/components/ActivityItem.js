import React from 'react';
import { Text, View, List } from 'react-native';
import { ListItem } from 'react-native-elements';

export const ActivityItem = ({item}) => {
   // console.log(item);
    const { name } = item;
    return (
        <View>
        <ListItem
            title={name}
        />
        </View>
    )
}