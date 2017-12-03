import React from 'react';
import { View, Text } from 'react-native';
import { Button, Card } from 'react-native-elements';


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
            <Card title="Basic Details">
                <View style={card = {alignSelf: 'center'}}>
                    <Text>{full_name}</Text>
                    <Text>{gender === 'M' ? 'Male' : 'Female'}</Text>
                    <Text>{email ? email : 'No email found'}</Text>
                    <Text>DOB: {dob}</Text>
                    <Text>Mobile: {phoneInfo.length !== 0 && phoneInfo.mobile ? phoneInfo.mobile.phone : 'No mobile found'}</Text>
                    <Text>Home: {phoneInfo.length !== 0 && phoneInfo.home ? phoneInfo.home.phone : 'No home number found'}</Text>
                </View>
            </Card>
            <Button
                small
                iconLeft
                title='Show More'
                buttonStyle={ wrapper = {marginTop: 40} }
            />
        </View>
    );
};


