import React from 'react';
import { View, Text } from 'react-native';
import { ListItem } from 'react-native-elements';
import { CustomerFullDetails } from './CustomerFullDetails';

export const CustomerItem = (customer) => {
       return (
            <ListItem
                roundAvatar
                title={`${customer.item.name.first} ${customer.item.name.last}`}
                onPress={() => {return CustomerFullDetails(customer)}}
            />
        );
    
};
