import React from 'react';
import { View, Text } from 'react-native'
import { connect } from 'react-redux';
import { addCustomerChunck } from '../actions/customers';

const CustomersList = (props) => {
    console.log(typeof props.customers === 'object');
    return (
        <View>
            { typeof props.customers === 'object' && props.customers.map((c) => <Text key={c.registered}>{c.name.first}</Text>)}
        </View>
    );
};


export default CustomersList;