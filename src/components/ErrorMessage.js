import React from 'react';
import { View, Text } from 'react-native';
import { Badge, Tile } from 'react-native-elements';

export const ErrorMessage = ({ message, errorStyle }) => {

    switch (errorStyle) {
        case 'bubble':
            return (
                <View style={styles.viewWrapper}>
                    <Badge 
                    containerStyle={styles.badgeContainer}>
                        <Text style={styles.textStyle}>{message}</Text>
                    </Badge>       
                </View>
            );
        case 'block':
            return (
                <View style={styles.viewWrapper}>
                    <Tile 
                        featured
                        containerStyle={{alignSelf: 'center'}}
                        imageSrc={require('../assets/404_background.jpg')}
                        title={message}
                    />       
                </View>
            );
        default:
            return (
                <View style={styles.viewWrapper}>
                    <Badge 
                    containerStyle={styles.badgeContainer}>
                        <Text style={styles.textStyle}>{message}</Text>
                    </Badge>       
                </View>
            );
    }
    

    
};

const styles = {
    viewWrapper : {
        marginTop: 10, 
        marginLeft: 20, 
        marginRight: 20
    },
    badgeContainer : {
        backgroundColor: '#ff8e00', 
        paddingTop:15, 
        paddingBottom: 15
    },
    textStyle : {
        color: '#fff', 
        fontSize:14,
        textAlign: 'center'
    }
}