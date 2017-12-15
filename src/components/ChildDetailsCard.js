import { Card } from 'react-native-elements';
import { Text, View, StyleSheet } from 'react-native';
import React from 'react';
const Moment = require('moment');
//emergency contact -- needs to save
//school info -- done
//health info -- done
//auth pickups/ non-auth pickups --not found
//adresses -- needs to save
//...everything else in order

export const ChildDetailsCard = ({ schoolName, schoolYear, healthInformation, customerCreated, fullName }) => {
    return (
        <Card>
            <Text style= {styles.text}>Acount Created: {Moment(customerCreated).format("MMMM D, YYYY, h:mm:ss a")}</Text>
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
        </Card>
    )
};

const styles = StyleSheet.create({
    text: {
        paddingLeft: 20,
        fontSize: 18,
        marginBottom: 15
    }
});