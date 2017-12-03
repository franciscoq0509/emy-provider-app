import React from 'react';
import { View, Text } from 'react-native';


export const CustomerFullDetails = ({ full_name, dob, email, status, gender, phones } = allCustomerDetails) => { //{ full_name, dob, email, status, gender } = 
    //console.log(allCustomerDetails);
    const phoneInfo = {
        length: phones.length,
        mobile: phones.find((obj) => obj.name === 'Mobile'? obj : false),
        home: phones.find((obj) => obj.name === 'Home'? obj : false),
    }
    console.log(phoneInfo);
    return (
        <View>
            <Text>This is the full details for : {full_name}</Text>
            <Text>gender: {gender === 'M' ? 'Male' : 'Female'}</Text>
            <Text>email: {email}</Text>
            <Text>dob: {dob}</Text>
            <Text>status: {status}</Text> 
            <Text>Mobile: {phoneInfo.length !== 0 && phoneInfo.mobile ? phoneInfo.mobile.phone : 'N/A'}</Text>
            <Text>Home: {phoneInfo.length !== 0 && phoneInfo.home ? phoneInfo.home.phone : 'N/A'}</Text>
        </View>
    );
};


