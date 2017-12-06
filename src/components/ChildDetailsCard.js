import { Card } from 'react-native-elements';
import { Text, View } from 'react-native';
import React from 'react';
const Moment = require('moment');


export const ChildDetailsCard = ({ school_name, school_year, healthInformation, customerCreated, fullName }) => {
    return (
        <Card>
            <Text>created: {Moment(customerCreated).format("MMMM D, YYYY, h:mm:ss a")}</Text>
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
                <Text>No Health information was found on {fullName}!</Text>
            }
        </Card>
    )
};