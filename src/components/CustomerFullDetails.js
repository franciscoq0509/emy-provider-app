import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { Button, Card, Badge, Icon } from 'react-native-elements';
import { ParentDetailsCard } from './ParentDetailsCard';
import { ChildDetailsCard } from './ChildDetailsCard';
import { ErrorMessage } from '../components/ErrorMessage';
import call from 'react-native-phone-call';

const Moment = require('moment');

//primary contact and emergency contacts in first render
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
    } = props.basicCustomerDetails;

    const {
        schoolName,
        schoolYear,
        emergencyContacts,
        phones,
        healthInfo,
        addresses,
        familyDoctors,
        primaryContact 
    } = props.allCustomerDetails;

    console.log(primaryContact);

    let phoneNumbers = 0;
    if(phones !==undefined && typeof phones === 'object') {
        phoneNumbers = {
            Mobile : phones[Object.keys(phones).find((key) => phones[key].name === 'Mobile')],
            Home : phones[Object.keys(phones).find((key) => phones[key].name === 'Home')],
            Work : phones[Object.keys(phones).find((key) => phones[key].name === 'Work')],
        }
    }
    let healthInformation = 0;
    if(healthInfo !== undefined) {
        if(typeof healthInfo === 'object') {
            healthInformation = healthInfo[Object.keys(healthInfo)[0]] ? healthInfo[Object.keys(healthInfo)[0]] : 0; 
        } 
    }

    const callNumber = (type = null, number = null) => {
        if(type === null && number !== null) {
            call({
                number: number.replace(/-|\s/g,""),
                prompt: false
            })
        } else if (type !== null && number === null) {
            if('phone' in phoneNumbers[type]) {
                call({
                    number: phoneNumbers[type].phone.replace(/-|\s/g,""),
                    prompt: false
                })
            }
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

    showEmergencyContacts = (obj) => {
        if(obj === 0 || obj === undefined){
            return (
                <Badge containerStyle={{ backgroundColor: '#ff8e00', marginBottom: 15}}>
                    <Text style={{fontSize: 19, color: '#fff'}}>No emergency contacts found</Text>
                </Badge>
            );
        } else {
            return (
                <View>
                    {Object.keys(obj).map((key, index) => (
                            <View   style={styles.infoCard} key={key}>
                                <Text style= {styles.emergencyContactName}>{obj[key].first_name}</Text>
                                <View style={{flex:1, flexDirection: 'column'}}>
                                    <Text style= {styles.subText}>Relationship: { obj[key].relationship }</Text>
                                    <Button
                                        small
                                        backgroundColor='#74CC82'
                                        title={ obj[key].phone }
                                        iconRight={{name: 'phone', type: 'Entypo'}}
                                        onPress={() => callNumber(null, obj[key].phone)}
                                    />
                                </View>
                            </View>
                        )
                    )}
                </View>
            );
        }
    }
    
    return (
        <ScrollView>
            <Card title="Details">
                <View>
                    <Text style= {styles.text}>{full_name}</Text>
                    <Text style= {styles.text}>{gender === 'M' ? 'Male' : 'Female'}</Text>
                    <Text style= {styles.text}>email: {email ? email : 'None found'}</Text>
                    <Text style= {styles.text}>DOB: {dob !== null ? Moment(dob).format("MMMM DD, YYYY") : 'Not found'}</Text>
                    {findNumber('Mobile')}
                    {findNumber('Work')}
                    {findNumber('Home')}
                </View>
            </Card>
            {
                is_child ?
                <Card title="Emergency Contacts">
                    {this.showEmergencyContacts(emergencyContacts)}
                </Card>
                :
                false
            }
            {
                props.showMoreClicked ? 
                <View>
                    {is_child ? 
                        <ChildDetailsCard 
                            schoolName={schoolName} 
                            schoolYear={schoolYear}
                            healthInformation={healthInformation}
                            emergencyContacts={emergencyContacts}
                            customerCreated={created}
                            fullName={full_name}
                            addresses={addresses}
                        />
                        :
                        <ParentDetailsCard 
                            customerCreated={created} 
                            fullName={full_name}
                            addresses={addresses}
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

const styles = StyleSheet.create({
    infoCard: {
        paddingBottom: 15,
        paddingTop: 15,
        backgroundColor: '#e6f4f4',
        marginBottom: 15
    },
    title: {
        paddingLeft: 20,
        fontSize: 22,
        marginBottom: 10,
        color: '#2a2a2a'
    },
    text: {
        paddingLeft: 20,
        fontSize: 18,
        marginBottom: 15
    },
    emergencyContactName: {
        alignSelf:'center',
        fontSize: 18,
        marginBottom: 15
    },
    subText: {
        alignSelf: 'center',
        fontSize: 15,
        marginBottom: 15
    }
});



