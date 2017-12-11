import React from 'react';
import { FlatList, Text, View, ScrollView, Dimensions} from 'react-native';
import { List } from 'react-native-elements';
import { ActivityItem } from './ActivityItem';


export const ActivitiesList = ({activities, showSpinner}) => {
    const {height, width} = Dimensions.get('window');
    if(activities !== 0 && activities.length > 0) {
        _keyExtractor = (item, index) => index;
        return (
                <View>
                <List> 
                    <FlatList
                        data={activities}
                        renderItem={ActivityItem}
                        keyExtractor={this._keyExtractor}
                    />
                </List>
                </View>
        );
    } else {
        console.log(typeof activities);
        return (<Text>Show Spinner here...</Text>);
    }
}