import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { Button, Card, Badge, Icon } from 'react-native-elements';
import { ParentDetailsCard } from './ParentDetailsCard';
import { ChildDetailsCard } from './ChildDetailsCard';
//import { ErrorMessage } from '../components/ErrorMessage';
import call from 'react-native-phone-call';
import { ErrorMessage } from './ErrorMessage';

const Moment = require('moment');

//primary contact and emergency contacts in first render
export const CustomerFullDetails = (props) => {
    console.log(props.navigation.state.routeName);
    if (props.basicCustomerDetails === undefined) {
        return (
            <View>
                <ErrorMessage 
                    message={'Sorry we cannot find any information on this person.'} 
                    errorStyle={'block'}  
                />
            </View>
        );
    }
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
        primaryContact,
        parentAuthorizedPickups,
        providerAuthorizedPickups, 
        providerUnauthorizedPickups,
        parentUnauthorizedPickups,
        customQuestions
    } = props.allCustomerDetails;

    let phoneNumbers = 0;
    if(phones !== undefined && typeof phones === 'object') {
        phoneNumbers = {
            Mobile : phones[Object.keys(phones).find((key) => phones[key].name === 'Mobile')],
            Home : phones[Object.keys(phones).find((key) => phones[key].name === 'Home')],
            Work : phones[Object.keys(phones).find((key) => phones[key].name === 'Work')],
        }
    }
    let primaryContactPhones = 0;
    if(primaryContact && 'phones' in primaryContact) {
        primaryContactPhones = {
            Mobile : primaryContact.phones[Object.keys(primaryContact.phones).find((key) => primaryContact.phones[key].name === 'Mobile')],
            Home : primaryContact.phones[Object.keys(primaryContact.phones).find((key) => primaryContact.phones[key].name === 'Home')],
            Work : primaryContact.phones[Object.keys(primaryContact.phones).find((key) => primaryContact.phones[key].name === 'Work')],
        }
    }
    let healthInformation = 0;
    if(healthInfo !== undefined) {
        if(typeof healthInfo === 'object') {
            healthInformation = healthInfo[Object.keys(healthInfo)[0]] ? healthInfo[Object.keys(healthInfo)[0]] : 0; 
        } 
    }

    const callNumber = (type = null, phoneList, number = null) => {
        if(type === null && number !== null) {
            call({
                number: number.replace(/-|\s/g,""),
                prompt: false
            })
        } else if (type !== null && phoneList !== null) {
            if('phone' in phoneList[type]) {
                call({
                    number: phoneList[type].phone.replace(/-|\s/g,""),
                    prompt: false
                })
            }
        }
    }

    const createCallButton = (type, phoneList) => {
        if(phoneList && phoneList[type]) {
            return (
                <Button
                    containerViewStyle={{marginTop: 30}}
                    backgroundColor='#4CAF50'
                    title={`${type}: ${phoneList[type].phone}` }
                    iconRight={{name: 'phone', type: 'Entypo'}}
                    onPress={()=>callNumber(type, phoneList, null)}
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
                                        backgroundColor='#4CAF50'
                                        title={ obj[key].phone }
                                        iconRight={{name: 'phone', type: 'Entypo'}}
                                        onPress={() => callNumber(null, null, obj[key].phone)}
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
                    <Text style = {styles.text}>{full_name}</Text>
                    <Text style = {styles.text}>{gender === 'M' ? 'Male' : 'Female'}</Text>
                    {email ? <Text style= {styles.text}>email: {email} </Text> : false}
                    <Text style= {styles.text}>DOB: {dob !== null ? Moment(dob).format("MMMM DD, YYYY") : 'Not found'}</Text>
                    {createCallButton('Mobile', phoneNumbers)}
                    {createCallButton('Work', phoneNumbers)}
                    {createCallButton('Home', phoneNumbers)}
                </View>
            </Card>
            {
                is_child && primaryContact ?
                <View>
                    <Card title="Primary Contact" >
                        <Text style={{alignSelf: 'center', fontSize: 18}}>{primaryContact.full_name}</Text> 
                        {createCallButton('Mobile', primaryContactPhones)}
                        {createCallButton('Work', primaryContactPhones)}
                        {createCallButton('Home', primaryContactPhones)}
                        {primaryContact.email != "" ? <Text style = { styles.staticEmail }>Email : {primaryContact.email}</Text> : false}
                        <Button
                            containerViewStyle={{marginTop: 20}}
                            backgroundColor='#1976D2'
                            title={`Full details` }
                            iconRight={{name: 'folder-shared', type: 'Entypo', size: 25}}
                            onPress={()=>{
                                props.navigation.navigate('fullDetail', { 
                                customerId : primaryContact.id,
                                nav: props.nav 
                            })}}
                        />

                    </Card>
                    <Card title="Emergency Contacts">
                        {this.showEmergencyContacts(emergencyContacts)}
                    </Card>
                </View>
                :
                false
            }
            {
                props.showMoreClicked ? 
                <View>
                    <ChildDetailsCard 
                        schoolName={schoolName} 
                        schoolYear={schoolYear}
                        healthInformation={healthInformation}
                        emergencyContacts={emergencyContacts}
                        customerCreated={created}
                        fullName={full_name}
                        addresses={addresses}
                        familyDoctors={familyDoctors}
                        parentAuthorizedPickups={parentAuthorizedPickups}
                        providerAuthorizedPickups={providerAuthorizedPickups}
                        providerUnauthorizedPickups={providerUnauthorizedPickups}
                        parentUnauthorizedPickups={parentUnauthorizedPickups}
                        customQuestions={customQuestions}
                    />    
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
                        buttonStyle={ wrapper = {marginTop: 40, marginBottom: 40} }
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
        backgroundColor: '#E3F2FD',
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
    staticEmail: {
        marginTop : 20,
        alignSelf: 'center',
        fontSize: 20,
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



