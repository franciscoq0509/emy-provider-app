import React from 'react';
import { View, Text } from 'react-native';


export const CustomerFullDetails = ({ name, phone, email, location }) => { //
    //console.log(data);
    return (
        <View>
            <Text>This is the full details for : {name.first} {name.last}</Text>
            <Text>Phone : {phone}</Text>
            <Text>Email : {email}</Text>
            <Text>lOCATION</Text>
            <Text>City : {location.city}</Text>
            <Text>Street : {location.street}</Text>
            <Text>State : {location.state}</Text>
            <Text>Post Code : {location.postcode}</Text>
        </View>
    );
};


