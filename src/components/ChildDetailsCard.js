import { Card, Button, Badge } from 'react-native-elements';
import { Text, View, StyleSheet } from 'react-native';
import React from 'react';
import call from 'react-native-phone-call';
const Moment = require('moment');

//emergency contact -- done
//school info -- done
//health info -- done
//auth pickups/ non-auth pickups --not found
//adresses -- onlu parent
//...everything else in order
//family doctor w/ call button
//complete health info -- done



export const ChildDetailsCard = ({ schoolName, schoolYear, healthInformation, customerCreated, fullName, emergencyContacts, addresses }) => {

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
                    <Text style= {styles.text}>Allergies: {healthInformation.allergies ? 
                        `yes ${healthInformation.allergies}` 
                        : 
                        'no'}</Text>
                    <Text style= {styles.text}>Bee Allergy Response: {
                        healthInformation.bee_allergy_response ?
                        <Text style= {styles.text}>{healthInformation.bee_allergy_response}</Text>
                        :
                        <Text style= {styles.text}>None</Text>
                        }
                    </Text>
                    <Text style= {styles.text}>Has a condition: {healthInformation.has_conditions ? 'yes' : 'no'}</Text>
                    <Text style= {styles.text}>Has medication: {healthInformation.has_medication ? 'yes' : 'no'}</Text>
                    {healthInformation.has_medication ? <Text style= {styles.text}>Medication: {healthInformation.medication}</Text> : 0}
                </View>
                :
                <Text style= {styles.text}>No Health information was found on {fullName}!</Text>
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