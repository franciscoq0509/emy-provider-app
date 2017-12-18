import { Card } from 'react-native-elements';
import { Text, View, StyleSheet } from 'react-native';
import React from 'react';
const Moment = require('moment');

export const ParentDetailsCard = ({ customerCreated, fullName, addresses }) => {
    console.log(addresses);
    return (
        <Card>
            <Text style= {styles.text}>Account Created: {Moment(customerCreated).format("MMMM D, YYYY, h:mm:ss a")}</Text>
            <Text style= {styles.text}>{fullName} is the parent of...</Text>
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