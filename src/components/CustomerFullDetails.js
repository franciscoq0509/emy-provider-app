import React from 'react';
import { View, Text } from 'react-native';


export const CustomerFullDetails = (props) => {
   return <View><Text>This is the full details.{props.item.name.first}</Text></View>;
};