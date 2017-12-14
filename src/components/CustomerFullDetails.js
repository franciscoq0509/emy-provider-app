import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { Button, Card, Badge, Icon } from 'react-native-elements';
import { ParentDetailsCard } from './ParentDetailsCard';
import { ChildDetailsCard } from './ChildDetailsCard';
import { ErrorMessage } from '../components/ErrorMessage';
import call from 'react-native-phone-call';

const Moment = require('moment');


export const CustomerFullDetails = (props) => {
    const { 
        full_name, 
        dob, 
        email, 
        status, 
        gender, 
        created,
        is_child,
        relationship,
        school_name,
        school_year,
    } = props.basicCustomerDetails;
    
    const {
        phones,
        healthInfo 
    } = props.allCustomerDetails
    let phoneNumbers = 0;
    if(phones !==undefined) {
        phoneNumbers = {
            Mobile : phones[Object.keys(phones).find((key) => phones[key].name === 'Mobile')],
            Home : phones[Object.keys(phones).find((key) => phones[key].name === 'Home')],
            Work : phones[Object.keys(phones).find((key) => phones[key].name === 'Work')],
        }
    }
    let healthInformation = 0;
    if(healthInfo !== undefined) {
        healthInformation = healthInfo[Object.keys(healthInfo)[0]] ? healthInfo[Object.keys(healthInfo)[0]] : 0; 
    }

    const callNumber = (type) => {
        if('phone' in phoneNumbers[type]) {
            call({
                number: phoneNumbers[type].phone.replace(/-|\s/g,""),
                prompt: false
            })
        }
    }

    const findNumber = (type) => {
        if(phoneNumbers && phoneNumbers[type]) {
            return (
                <Button
                    containerViewStyle={{marginTop: 30}}
                    backgroundColor='#74CC82'
                   title={`${type}: ${phoneNumbers[type].phone}` }
                   iconRight={{name: 'phone', type: 'Entypo'}}
                   onPress={()=>callNumber(type)}
                />
            );
        } 
    }
    
    return (
        <ScrollView>
            <Card title="Details">
                <View>
                    <Text>{full_name}</Text>
                    <Text>{gender === 'M' ? 'Male' : 'Female'}</Text>
                    <Text>email: {email ? email : 'None found'}</Text>
                    <Text>DOB: {dob !== null ? Moment(dob).format("MMMM D, YYYY") : 'Not found'}</Text>
                    {findNumber('Mobile')}
                    {findNumber('Work')}
                    {findNumber('Home')}
                </View>
            </Card>
            {
                props.showMoreClicked ? 
                <View>
                    {is_child ? 
                        <ChildDetailsCard 
                            school_name={school_name} 
                            school_year={school_year}
                            healthInformation={healthInformation}
                            customerCreated={created}
                            fullName={full_name}
                        />
                        :
                        <ParentDetailsCard 
                            customerCreated={created} 
                            fullName={full_name}
                        />
                    }
                </View>
                :
                <View>
                  {props.advancedDataLoadFailed ? 
                    <ErrorMessage message={`Sorry all information on ${full_name} could not be found at this time`} type={'bubble'}/>
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
            }
        </ScrollView>
    );
};


