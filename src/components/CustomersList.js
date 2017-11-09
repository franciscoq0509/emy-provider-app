import React from 'react';
import { View, Text } from 'react-native'
import { connect } from 'react-redux';
import addCustomerChunck from '../actions/customers';


const fetchCustomers = () => (
    fetch('https://randomuser.me/api/?results=500')
);

const asyncAction = () => {
    return (dispatch) => {
        return fetchCustomers().then(
            (successData) => dispatch(addCustomerChunck(successData)),
            (error) => 'Error'
        );
    };
};


class CustomersList extends React.Component {
    constructor({ newChunk, ...props }) {
        super(newChunk, props);
        props.dispatch(asyncAction());
        this.renderStuff = this.renderStuff.bind(this);
        this.state = {
            chunk: newChunk
        }
    };

    renderStuff(props){
        return props.map((el) => {el});
    }

    render(){
        return (
            <View>
                <Text>{this.state.chunk}</Text>
            </View>
        );
    };
};

export default connect()(CustomersList);