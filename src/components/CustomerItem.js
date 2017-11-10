import React from 'react';
import { View, Text } from 'react-native';

export const CustomerItem = (customer) => {
       return (
            <View>
                <Text>{customer.item.name.first}</Text>
                <Text>{customer.item.name.last}</Text>
                <Text></Text>
            </View>
        );
    
};
