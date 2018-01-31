import React from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { ListItem } from 'react-native-elements';
import { addNavigationHelpers } from 'react-navigation';
import spinnerStyle from './styles/spinnerStyle';
import { clickCount } from '../utilities/customerListClickCount';

export const CustomerItem = (props) => {

    navigate = () => {
        clickCount.count++
        if(clickCount.count === 1) {
            props.item.nav.navigate('fullDetail', { 
                customerId : props.item.id,
                nav: props.item.nav,
            })
        }
    }

        return (
            <View>
                {
                    props.item !== undefined ?
                        <ListItem
                            containerStyle={props.item.is_child ? {} : {backgroundColor: '#E3F2FD'}}
                            roundAvatar
                            title={`${props.item.first_name} ${props.item.last_name}`}
                            onPress={this.navigate}
                            underlayColor={'#D9D9D9'}
                        />
                    :
                    <View style={spinnerStyle.container}>
                        <ActivityIndicator
                            animating = {true}
                            size = "large"
                        />
                    </View>
                }
            </View>            
        );
};


