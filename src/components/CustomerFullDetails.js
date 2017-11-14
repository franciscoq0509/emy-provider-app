import React from 'react';
import { View, Text } from 'react-native';


export const CustomerFullDetails = (props) => {
   return <Text>This is the full details for : {props.navigation.state.params.customer.name.first}</Text>;
};