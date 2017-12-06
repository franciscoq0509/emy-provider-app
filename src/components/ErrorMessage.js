import React from 'react';
import { View, Text } from 'react-native';
import { Badge } from 'react-native-elements';

export const ErrorMessage = ({ type }) => {
    switch (type) {
        case 'validation':
            return (
                <View style={styles.viewWrapper}>
                    <Badge 
                    containerStyle={styles.badgeContainer}>
                        <Text style={styles.textStyle}>Sorry your username or password are incorrect</Text>
                    </Badge>       
                </View>
            )
        default:
            return (
                <View>
                    <Text>An error occured</Text>
                </View>
            )
    }
    
};

const styles = {
    viewWrapper : {
        marginTop: 30, 
        marginLeft: 20, 
        marginRight: 20
    },
    badgeContainer : {
        backgroundColor: '#ff8e00', 
        paddingTop:10, 
        paddingBottom: 15
    },
    textStyle : {
        color: '#fff', 
        fontSize:18
    }
}