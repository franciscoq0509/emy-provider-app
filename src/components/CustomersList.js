import React from 'react';
import { View, Text, FlatList } from 'react-native'
import { connect } from 'react-redux';
import { addCustomerChunck } from '../actions/customers';
import { CustomerItem } from './CustomerItem';

const CustomersList = (props) => {
    console.log(props);
    console.log(typeof props.customers === 'object');
    const _keyExtractor = (item, index) => item.registered;
    return (
        <View> 
                <FlatList
                    data={props.customers}
                    renderItem={CustomerItem}
                    keyExtractor={_keyExtractor}
                />
        </View>
    );
};


export default CustomersList;