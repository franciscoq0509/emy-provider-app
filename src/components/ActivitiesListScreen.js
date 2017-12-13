import React from 'react';
import { View, Text, List, FlatList, ScrollView, Dimensions } from 'react-native';
import { TabNavigator, addNavigationHelpers } from 'react-navigation';
import { Icon, ButtonGroup } from 'react-native-elements';
import Header from './Header';
import { ActivitiesList } from './ActivitiesList';
import StandardSearchbar from './StandardSearchbar';
import { getObjectById } from '../utilities/getObjectById';


export default class ActivitiesListScreen extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedIndex: 1
        }
    }


    selectActivitiesToShow = (time) => {
        if('activities' in this.props && this.props.activities === undefined) {
            return 0;
        } else if ('activities' in this.props && this.props.activities !== undefined && Object.keys(this.props.activities).length > 0){
            let keys = null;
            switch (time) {
                case 'past':
                    keys = Object.keys(this.props.activities).filter((key) => this.props.activities[key].timeCategory === 'past');
                    return getObjectById(keys, this.props.activities);
                case 'current':
                    keys = Object.keys(this.props.activities).filter((key) => this.props.activities[key].timeCategory === 'current');
                    return getObjectById(keys, this.props.activities);
                case 'future':
                    keys = Object.keys(this.props.activities).filter((key) => this.props.activities[key].timeCategory === 'future');
                    return getObjectById(keys, this.props.activities);
                default:
                    return Object.keys(this.props.activities).filter((key) => this.props.activities[key].timeCategory === 'current');
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
                            showSpinner={this.showSpinner}
                            nav={this.props.nav}
                        />
                    </ScrollView>
                );
            case 1:
                return (
                    <ScrollView>
                        <ActivitiesList
                            activities = {this.selectActivitiesToShow('current')}
                            showSpinner={this.showSpinner}
                            nav={this.props.nav}
                        />
                    </ScrollView>
                );
            case 2:
                return (
                    <ScrollView>
                        <ActivitiesList
                            activities = {this.selectActivitiesToShow('future')}
                            showSpinner={this.showSpinner}
                            nav={this.props.nav}
                        />
                    </ScrollView>
                );
        
            default:
                return (
                    <ScrollView>
                        <ActivitiesList
                            activities = {this.selectActivitiesToShow('current')}
                            showSpinner={this.showSpinner}
                            nav={this.props.nav}
                        />
                    </ScrollView>
                );
        }
    }

    updateIndex = (selectedIndex) => {
        this.setState({selectedIndex});
    }

    componentWillReceiveProps(nextProps) { 
		if(this.props !== nextProps) {
            this.setState(() => ({activities : nextProps.activities}));
		}
	}

    render() {
        const buttons = ['Past', 'Current', 'Future'];
        return (
            <View>
                <StandardSearchbar search="allActivities" />
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
