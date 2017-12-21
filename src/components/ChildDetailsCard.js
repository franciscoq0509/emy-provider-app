import { Card, Button, Badge } from 'react-native-elements';
import { Text, View, StyleSheet } from 'react-native';
import React from 'react';
import call from 'react-native-phone-call';
const Moment = require('moment');

//health info -- add provider health notes
//auth pickups/ non-auth pickups --finish auth pickups. render non auth pickups
//adresses -- do for both parent and child if exists
//family doctor w/ call button -- do for parent
//all other parent data found

export const ChildDetailsCard = ({ 
        schoolName, 
        schoolYear, 
        healthInformation, 
        customerCreated, 
        fullName, 
        emergencyContacts, 
        addresses, 
        familyDoctors, 
        parentAuthorizedPickups, 
        providerAuthorizedPickups, 
        providerUnauthorizedPickups,
        parentUnauthorizedPickups 
    }) => {
    console.log(providerUnauthorizedPickups);
    callNumber = (number) => {
        call({
            number: number.replace(/-|\s/g,""),
            prompt: false
        })
    }

    return (
        <Card>
            <View style={styles.infoCard}>
                <Text style={styles.title}>School Information</Text>
                <Text style= {styles.text}>School: {schoolName ? schoolName : 'N/A'}</Text>
                <Text style= {styles.text}>School Year: {schoolYear ? schoolYear : 'N/A'}</Text>
            </View>
            
            {healthInformation ?
                <View style={styles.infoCard}>
                    <Text style={styles.title}>Health Information</Text>
                    <Text style= {styles.text}>Allergies: {healthInformation.has_allergies ? 
                        `yes ${healthInformation.allergies}` 
                        : 
                        'no'}
                    </Text>
                    <Text style= {styles.text}>Bee Allergy Response: {
                        healthInformation.bee_allergy_response ?
                        <Text style= {styles.text}>{healthInformation.bee_allergy_response}</Text>
                        :
                        <Text style= {styles.text}>None</Text>
                        }
                    </Text>
                    <Text style= {styles.text}>Has a condition: {healthInformation.has_conditions ? 'yes' : 'no'}</Text>
                    <Text style= {styles.text}>Has medication: {healthInformation.has_medication ? 'yes' : 'no'}</Text>
                    {healthInformation.has_medication ? <Text style= {styles.text}>Medication: {healthInformation.medication}</Text> : false}
                </View>
                :
                <View style={styles.infoCard}> 
                    <Text style= {styles.title}>No Health information was found on {fullName}</Text>
                </View>
            }
            
            {parentAuthorizedPickups ?
                <View style={styles.infoCard}> 
                <Text style={styles.title}>Parent Authorized Pickups</Text>
                {parentAuthorizedPickups.map(({first_name, last_name, phone, active}, index) => (
                    active ? 
                        <View key={index}>
                            {(first_name && last_name) ? <Text style={{fontSize: 20, alignSelf: 'center', marginTop: 50, marginBottom: 10}}>{first_name} {last_name}</Text> : false} 
                            {phone ?
                                <Button
                                    small
                                    backgroundColor='#74CC82'
                                    title={ phone }
                                    iconRight={{name: 'phone', type: 'Entypo'}}
                                    onPress={() => callNumber(phone)}
                                />
                                :
                                <Button
                                    small
                                    backgroundColor='#E5644E'
                                    title={ 'No Number Found' }
                                    onPress={false}
                                />
                            }
                        </View>
                        : 
                        false
                ))}
                </View>
                :
                <View style={styles.infoCard}>
                    <Text style={styles.title}>No parent authorized pickups found</Text>
                </View>
            }

            {providerAuthorizedPickups ?
                <View style={styles.infoCard}> 
                <Text style={styles.title}>Provider Authorized Pickups</Text>
                    <View>
                        {
                            (providerAuthorizedPickups.authorized_pickups) ? 
                            <Text style={styles.text}>{providerAuthorizedPickups.authorized_pickups}</Text> 
                            : 
                            <Text style={styles.text}>No provider authorized Pickups found</Text>
                        } 
                    </View>
                </View>
                :
                <View style={styles.infoCard}>
                    <Text style={styles.title}>No provider authorized pickups found</Text>
                </View>
            }

            {providerUnauthorizedPickups ?
                <View style={styles.infoCard}>
                    <Text style={styles.title}>Provider Unauthorized pickups</Text>
                    <Text style={styles.text}>{providerUnauthorizedPickups}</Text>
                </View>
                :
                <View style={styles.infoCard}>
                    <Text style={styles.title}>No provider unauthorized pickups found</Text>
                </View>
            }

            {parentUnauthorizedPickups ?
                <View style={styles.infoCard}>
                    <Text style={styles.title}>Parent Unauthorized pickups</Text>
                    <Text style={styles.text}>{parentUnauthorizedPickups}</Text>
                </View>
                :
                <View style={styles.infoCard}>
                    <Text style={styles.title}>No parent unauthorized pickups found</Text>
                </View>
            }
        

            {Object.keys(familyDoctors).length > 0 ?
                <View style={styles.infoCard}>
                    <Text style={styles.title}>Family Doctors</Text>
                    {Object.keys(familyDoctors).map((d) => (
                        <View key={familyDoctors[d]}>
                            <Text style={styles.text}>{familyDoctors[d].medical_clinic}</Text>
                            <Text style={styles.text}>Doctor: {familyDoctors[d].name}</Text>
                            <Button
                                small
                                backgroundColor='#74CC82'
                                title={ familyDoctors[d].phone }
                                iconRight={{name: 'phone', type: 'Entypo'}}
                                onPress={() => callNumber(familyDoctors[d].phone)}
                            />
                        </View>
                    ))}
                    
                </View>
                :
                false
            }
            
            <Text style= {styles.text}>Last Modified: {Moment(healthInformation.modified).format("DD of MMMM, YYYY")}</Text>
            <Text style= {styles.text}>Acount Created: {Moment(customerCreated).format("MMMM D, YYYY, h:mm:ss a")}</Text>
        </Card>
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