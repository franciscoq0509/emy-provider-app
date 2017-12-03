import React from 'react';
import { View, Text } from 'react-native';


export const CustomerFullDetails = ({ full_name, dob, email, status, gender } = allCustomerDetails) => { //{ full_name, dob, email, status, gender } = 
    //console.log(allCustomerDetails);
    return (
        <View>
            <Text>This is the full details for : {full_name}</Text>
            <Text>gender: {gender === 'M' ? 'Male' : 'Female'}</Text>
            <Text>email: {email}</Text>
            <Text>dob: {dob}</Text>
            <Text>status: {status}</Text>
        </View>
    );
};


