import { Card } from 'react-native-elements';
import { Text, View } from 'react-native';
import React from 'react';
const Moment = require('moment');

export const ParentDetailsCard = ({ customerCreated, fullName }) => {
    return (
        <Card>
            <Text>created: {Moment(customerCreated).format("MMMM D, YYYY, h:mm:ss a")}</Text>
            <Text>{fullName} is the parent of...</Text>
        </Card>
    )
};