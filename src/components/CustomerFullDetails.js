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
        //special_needs 
    } = props.basicCustomerDetails;
    const {
        phones,
        healthInfo 
    } = props.allCustomerDetails
    const phoneNumbers = {
        Mobile : phones[Object.keys(phones).find((key) => phones[key].name === 'Mobile')],
        Home : phones[Object.keys(phones).find((key) => phones[key].name === 'Home')],
        Work : phones[Object.keys(phones).find((key) => phones[key].name === 'Work')],
    }
    const healthInformation = healthInfo[Object.keys(healthInfo)[0]] ? healthInfo[Object.keys(healthInfo)[0]] : 0; 
    console.log(phoneNumbers);
    
    // const phoneInfo = {
    //     length: phones.length,
    //     mobile: phones.find((obj) => obj.name === 'Mobile'? obj : false),
    //     home: phones.find((obj) => obj.name === 'Home'? obj : false),
    // }

    console.log(dob);
    console.log(healthInfo[Object.keys(healthInfo)[0]]);
    return (
        <View>
            <Card title="Details">
                <View style={card = {alignSelf: 'flex-start'}}>
                    <Text>{full_name}</Text>
                    <Text>{gender === 'M' ? 'Male' : 'Female'}</Text>
                    <Text>email: {email ? email : 'None found'}</Text>
                    <Text>DOB: {dob !== null ? Moment(dob).format("MMMM D, YYYY") : 'Not found'}</Text>
                    <Text>Mobile: {phoneNumbers.Mobile ? phoneNumbers.Mobile.phone : 'None found'}</Text>
                    <Text>Work: {phoneNumbers.Work ? phoneNumbers.Work.phone : 'None found'}</Text>
                    <Text>Home: {phoneNumbers.Home ? phoneNumbers.Home.phone : 'None found'}</Text>
                </View>
            </Card>
            {
                props.showMoreClicked ? 
                <Card>
                    <View style={card = {alignSelf: 'flex-start'}}>
                        <Text>created: {Moment(created).format("MMMM D, YYYY, h:mm:ss a")}</Text>
                        {is_child ? 
                            <View>
                                <Text>School Name: {school_name ? school_name : 'N/A'}</Text>
                                <Text>School Year: {school_year ? school_year : 'N/A'}</Text>
                                {healthInformation ?
                                    <View>
                                        <Text>Allergies: {healthInformation.allergies ? 
                                            `yes ${healthInformation.allergies}` 
                                            : 
                                            'no'}</Text>
                                        <Text>Bee Allergy Response: {
                                            healthInformation.bee_allergy_response ?
                                            <Text>{healthInformation.bee_allergy_response}</Text>
                                            :
                                            <Text>None</Text>
                                            }
                                        </Text>
                                    </View>
                                    :
                                    <Text>No Health information was found on {full_name}!</Text>
                                }
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


