import React from 'react';
import { View, Text, ActivityIndicator, TouchableOpacity } from 'react-native';
import { ListItem } from 'react-native-elements';
import { addNavigationHelpers } from 'react-navigation';
import spinnerStyle from './styles/spinnerStyle';

export default class CustomerItem extends React.PureComponent {

    navigate = () => {
        this.props.item.nav.navigate('fullDetail', { 
            customerId : this.props.item.id,
            nav: this.props.item.nav 
        })
    }
    render() {
        return (
            <View>
                {
                    this.props.item !== undefined ?
                        <ListItem
                            containerStyle={this.props.item.is_child ? {} : {backgroundColor: '#E3F2FD'}}
                            roundAvatar
                            title={`${this.props.item.first_name} ${this.props.item.last_name}`}
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
    }
    

};

//containerStyle={this.props.item.is_child ? {} : {backgroundColor: '#E3F2FD'}}


// <View>
//     {
//         props.item !== undefined ?
//             <ListItem
//                 containerStyle={props.item.is_child ? {} : {backgroundColor: '#E3F2FD'}}
//                 roundAvatar
//                 title={`${props.item.first_name} ${props.item.last_name}`}
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

