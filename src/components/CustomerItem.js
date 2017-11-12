import React from 'react';
import { View, Text } from 'react-native';
import { ListItem } from 'react-native-elements';

export const CustomerItem = (customer) => {
       return (
            <ListItem
                roundAvatar
                title={`${customer.item.name.first} ${customer.item.name.last}`}
            />
        );
    
};
