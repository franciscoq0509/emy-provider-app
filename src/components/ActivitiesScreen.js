import React from 'react';
import { View, Text, List, FlatList, ScrollView, Dimensions } from 'react-native';
import { TabNavigator, addNavigationHelpers } from 'react-navigation';
import { Icon, ButtonGroup } from 'react-native-elements';
import Header from './Header';
import { ActivitiesList } from './ActivitiesList';


export default class ActivitiesScreen extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedIndex: 1
        }
    }

    selectActivitiesToShow = (time) => {
        console.log(this.props);
        if('activities' in this.props && this.props.activities === undefined) {
            return 0;
        } else if ('activities' in this.props && this.props.activities !== undefined && Object.keys(this.props.activities).length > 0){
            switch (time) {
                case 'past':
                    return this.props.activities.filter((act) => act.timeCategory === 'past');
                case 'current':
                    return this.props.activities.filter((act) => {console.log(act);return act.timeCategory === 'current';})
                case 'future':
                    return this.props.activities.filter((act) => act.timeCategory === 'future');
                default:
                    return this.props.activities.filter((act) => act.timeCategory === 'current');
            }
        } else {
            return 0;
        }
    }

    showSpinner = () => (('activities' in this.props && this.props.activities.length > 0) ? false : true);

    

    showSelected = () => {
        switch (this.state.selectedIndex) {
            case 0:
                return (
                    <ScrollView>
                    <ActivitiesList
                    activities = {this.selectActivitiesToShow('past')}
                    showSpinner={this.showSpinner}/>
                    </ScrollView>
                );
            case 1:
                return (
                    <ScrollView>
                    <ActivitiesList
                    activities = {this.selectActivitiesToShow('current')}
                    showSpinner={this.showSpinner}/>
                    </ScrollView>
                );
            case 2:
                return (
                    <ScrollView>
                    <ActivitiesList
                    activities = {this.selectActivitiesToShow('future')}
                    showSpinner={this.showSpinner}/>
                    </ScrollView>
                );
        
            default:
                return (
                    <ActivitiesCurrent activities = {this.selectActivitiesToShow('current')}
                    showSpinner={this.showSpinner}/>
                );
        }
    }

    updateIndex = (selectedIndex) => {
        this.setState({selectedIndex});
    }

    render() {
        const buttons = ['Past', 'Current', 'Future'];
        return (
            <View>
                <Header />
                <ButtonGroup 
                onPress={this.updateIndex}
                selectedIndex={this.state.selectedIndex}
                buttons={buttons}
                containerStyle={{height: 50}}
                />
            {this.showSelected()}
            </View>
        );
    }
}
