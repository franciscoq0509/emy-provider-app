import React from 'react';
import { FlatList, Text, View, ScrollView, Dimensions} from 'react-native';
import { List } from 'react-native-elements';
import { ActivityItem } from './ActivityItem';


export const ActivitiesList = ({activities, showSpinner, nav}) => {
    const {height, width} = Dimensions.get('window');
    if(activities !== 0 && activities.length > 0) {
        const activitiesAndNav = () => {
            return activities.length !== 0 ? activities.map(a => ({...a, nav})) : activities;
        }
        const _keyExtractor = (item, index) => index;
        return (
                <View>
                <List> 
                    <FlatList
                        data={activitiesAndNav()}
                        renderItem={ActivityItem}
                        keyExtractor={_keyExtractor}
                    />
                </List>
                </View>
        );
    } else {
        return (<Text>Show Spinner here...</Text>);
    }
}