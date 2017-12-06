import React from 'react';
import { View, Text } from 'react-native';
import { Button, Card } from 'react-native-elements';
const Moment = require('moment');


export const CustomerFullDetails = (props) => {
    console.log(props);
    const { 
        full_name, 
        dob, 
        email, 
        status, 
        gender, 
        //phones,
        created,
        is_child,
        relationship,
        school_name,
        school_year,
        special_needs 
    } = props.basicCustomerDetails;
    const {
        phones 
    } = props.allCustomerDetails
    const phoneNumbers = {
        Mobile : phones[Object.keys(phones).find((key) => phones[key].name === 'Mobile')],
        Home : phones[Object.keys(phones).find((key) => phones[key].name === 'Home')],
        Work : phones[Object.keys(phones).find((key) => phones[key].name === 'Work')],
    }
    console.log(phoneNumbers);
    
    // const phoneInfo = {
    //     length: phones.length,
    //     mobile: phones.find((obj) => obj.name === 'Mobile'? obj : false),
    //     home: phones.find((obj) => obj.name === 'Home'? obj : false),
    // }

    console.log(dob);
    return (
        <View>
            <Card title="Details">
                <View style={card = {alignSelf: 'flex-start'}}>
                    <Text>{full_name}</Text>
                    <Text>{gender === 'M' ? 'Male' : 'Female'}</Text>
                    <Text>email: {email ? email : 'None found'}</Text>
                    <Text>DOB: {Moment(dob).format("MMMM D, YYYY")}</Text>
                    <Text>Mobile: {phoneNumbers.Mobile ? phoneNumbers.Mobile.phone : 'N/A'}</Text>
                    <Text>Work: {phoneNumbers.Work ? phoneNumbers.Work.phone : 'N/A'}</Text>
                    <Text>Home: {phoneNumbers.Home ? phoneNumbers.Home.phone : 'N/A'}</Text>
                </View>
            </Card>
            {
                props.showMoreClicked ? 
                <Card>
                    <View style={card = {alignSelf: 'flex-start'}}>
                        <Text>created: {Moment(created).format("MMMM D, YYYY, h:mm:ss a")}</Text>
                        {parseInt(is_child,10) ? 
                            <View>
                                <Text>School Name: {school_name ? school_name : 'N/A'}</Text>
                                <Text>School Year: {school_year ? school_year : 'N/A'}</Text>
                                <Text>Special Needs: {special_needs ? special_needs : 'None'}</Text>
                            </View>
                                : 
                            <Text>{full_name} is the parent of...</Text>
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


