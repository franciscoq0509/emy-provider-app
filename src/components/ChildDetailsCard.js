import { Card, Button } from 'react-native-elements';
import { Text, View, StyleSheet } from 'react-native';
import React from 'react';
const Moment = require('moment');
//emergency contact -- needs to save
//school info -- done
//health info -- done
//auth pickups/ non-auth pickups --not found
//adresses -- needs to save
//...everything else in order

//add subtle color to either card or text?

export const ChildDetailsCard = ({ schoolName, schoolYear, healthInformation, customerCreated, fullName, emergencyContacts }) => {

    showEmergencyContacts = (obj) => {
        if(obj === 0 ){
            return <Text style={styles.text}>No emergency contacts found</Text>;
        } else {
            return (
                <View>
                    <Text style= {styles.text}>Emergency Contacts</Text>
                    {Object.keys(obj).map((key, index) => (
                            <View   style={styles.emergencyContactCard} key={key}>
                                <Text style= {styles.emergencyContactName}>{obj[key].first_name}</Text>
                                <View style={{flex:1, flexDirection: 'column'}}>
                                    <Text style= {styles.subText}>Relationship: { obj[key].relationship }</Text>
                                    <Button
                                        small
                                        backgroundColor='#74CC82'
                                        title={ obj[key].phone }
                                        iconRight={{name: 'phone', type: 'Entypo'}}
                                    />
                                </View>
                            </View>
                        )
                    )}
                </View>
            );
        }
    }

    console.log('here', emergencyContacts);
    //                <Text>{emergencyContacts[Object.keys(emergencyContacts[0])].first_name}</Text>
    return (
        <Card>
            {this.showEmergencyContacts(emergencyContacts)}
            <Text style= {styles.text}>School Name: {schoolName ? schoolName : 'N/A'}</Text>
            <Text style= {styles.text}>School Year: {schoolYear ? schoolYear : 'N/A'}</Text>
            {healthInformation ?
                <View>
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
                </View>
                :
                <Text style= {styles.text}>No Health information was found on {fullName}!</Text>
            }
            <Text style= {styles.text}>Acount Created: {Moment(customerCreated).format("MMMM D, YYYY, h:mm:ss a")}</Text>
        </Card>
    )
};

const styles = StyleSheet.create({
    emergencyContactCard: {
        paddingBottom: 15,
        paddingTop: 15,
        borderColor: '#898989',
        backgroundColor: '#e6f4f4',
        marginBottom: 15
    },
    emergencyContactBorderTop: {
        borderWidth:  1,
        borderLeftWidth: 0,
        borderRightWidth: 0,
        borderBottomWidth: 0,
    },
    title: {
        paddingLeft: 20,
        fontSize: 20,
        marginBottom: 10
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