import React from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { ListItem } from 'react-native-elements';
import { addNavigationHelpers } from 'react-navigation';
import spinnerStyle from './styles/spinnerStyle';
//import { initReqObject } from '../utilities/customerDetailsLoadingInit';
//import { Throttle } from 'react-throttle';
//import _ from 'lodash';
//const _ = require('lodash');
import { clickCount } from '../utilities/customerListClickCount';
//let count = clickCount();
console.log(clickCount.count);

export const CustomerItem = (props) => {

    navigate = () => {
        clickCount.count++
        //let reqObj = initReqObject(props.item.id);
        console.log('before throttle');
        //return _.throttle(()=>{
            if(clickCount.count === 1) {
                //clickNumber = 0;
            console.log('clicked');
                    props.item.nav.navigate('fullDetail', { 
                    customerId : props.item.id,
                    nav: props.item.nav,
                })
            } else {
                console.log(clickCount.count);
                console.log('rejected');
            }
        //},1000,{'trailing':false})();
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

