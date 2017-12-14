import { Card } from 'react-native-elements';
import { Text, View, StyleSheet } from 'react-native';
import React from 'react';
const Moment = require('moment');
//emergency contact
//school info
//health info
//auth pickups/ non-auth pickups
//adresses
//...everything else in order

export const ChildDetailsCard = ({ school_name, school_year, healthInformation, customerCreated, fullName }) => {
    return (
        <Card>
            <Text style= {styles.text}>Acount Created: {Moment(customerCreated).format("MMMM D, YYYY, h:mm:ss a")}</Text>
            <Text style= {styles.text}>School Name: {school_name ? school_name : 'N/A'}</Text>
            <Text style= {styles.text}>School Year: {school_year ? school_year : 'N/A'}</Text>
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
                <Text>No Health information was found on {fullName}!</Text>
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