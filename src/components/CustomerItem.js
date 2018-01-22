import React from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { ListItem } from 'react-native-elements';
import { addNavigationHelpers } from 'react-navigation';
import spinnerStyle from './styles/spinnerStyle';

export const CustomerItem = (props) => {

    navigate = () => {
        props.item.nav.navigate('fullDetail', { 
            customerId : props.item.id,
            nav: props.item.nav 
        })
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

//containerStyle={this.props.item.is_child ? {} : {backgroundColor: '#E3F2FD'}}


// <View>
//     {
//         this.props.item !== undefined ?
//             <ListItem
//                 containerStyle={this.props.item.is_child ? {} : {backgroundColor: '#E3F2FD'}}
//                 roundAvatar
//                 title={`${this.props.item.first_name} ${this.props.item.last_name}`}
//                 onPress={this.navigate}
//             />
//         :
//         <View style={spinnerStyle.container}>
//             <ActivityIndicator
//                 animating = {true}
//                 size = "large"
//             />
//         </View>
//     }
// </View>






// <TouchableOpacity onPress={this.navigate} >
// <View>
//     <Text>{`${props.item.first_name} ${props.item.last_name}`}</Text>
// </View>
// </TouchableOpacity>

