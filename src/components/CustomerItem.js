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




// (
//     <View key={customer.registered}>
//         <Text>{customer.item}</Text>
//         <Text>{customer.item.name}</Text>
//         <Text></Text>
//     </View>
// );