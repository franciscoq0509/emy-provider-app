import React from 'react';
import { View, Text } from 'react-native';
import { Button, Card } from 'react-native-elements';


export const CustomerFullDetails = (props) => {
    const { 
        full_name, 
        dob, 
        email, 
        status, 
        gender, 
        phones,
        created,
        is_child,
        relationship,
        school_name,
        school_year,
        special_needs 
    } = props.allCustomerDetails;
    //console.log(allCustomerDetails);
    const phoneInfo = {
        length: phones.length,
        mobile: phones.find((obj) => obj.name === 'Mobile'? obj : false),
        home: phones.find((obj) => obj.name === 'Home'? obj : false),
    }

    return (
        <View>
            <Card title="Details">
                <View style={card = {alignSelf: 'flex-start'}}>
                    <Text>{full_name}</Text>
                    <Text>{gender === 'M' ? 'Male' : 'Female'}</Text>
                    <Text>{email ? email : 'No email found'}</Text>
                    <Text>DOB: {dob}</Text>
                    <Text>Mobile: {phoneInfo.length !== 0 && phoneInfo.mobile ? phoneInfo.mobile.phone : 'N/A'}</Text>
                    <Text>Home: {phoneInfo.length !== 0 && phoneInfo.home ? phoneInfo.home.phone : 'N/AA'}</Text>
                </View>
            </Card>
            {
                props.showMoreClicked ? 
                <Card>
                    <View style={card = {alignSelf: 'flex-start'}}>
                        <Text>created: {created}</Text>
                        {is_child ? 
                            <View>
                                <Text>School Name: {school_name ? school_name : 'N/A'}</Text>
                                <Text>School Year: {school_year ? school_year : 'N/A'}</Text>
                                <Text>Special Needs: {special_needs ? special_needs : 'None'}</Text>
                            </View>
                                : 
                            <Text>Is a parent</Text>
                        }
                        
                    </View>
                </Card>
                :
                <Button
                    small
                    iconLeft
                    title='Show More'
                    buttonStyle={ wrapper = {marginTop: 40} }
                    onPress={props.clickHandler}
                />
            }
        </View>
    );
};


