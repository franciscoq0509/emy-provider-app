import React from 'react';
import { View, Text } from 'react-native';
import { TabNavigator, addNavigationHelpers } from 'react-navigation';
import { Icon, ButtonGroup } from 'react-native-elements';
import Header from './Header';


// <List> 
// <FlatList
//     data={this.customersAndCallback()}
//     initialNumToRender={10}
//     onEndReachedThreshold={1200}
//     renderItem={CustomerItem}
//     keyExtractor={this._keyExtractor}
// />
// </List>

const ActivitiesPast = ({activities, showSpinner}) => {
    _keyExtractor = (item, index) => index;
    return (
        <Text>This is past activities</Text>
    );
}

const ActivitiesCurrent = ({activities, showSpinner}) => {
    return (
        <Text>This is current activities</Text>
    );
}

const ActivitiesFuture = ({activities, showSpinner}) => {
    return (
        <Text>This is future activities</Text>
    );
}


export default class ActivitiesList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedIndex: 1
        }
    }

    selectActivitiesToShow = (time) => {
        console.log(this.props);
        if(Object.keys(this.props.activities).length === 0) {
            return 0;
        } else {
            switch (time) {
                case 'past':
                    return this.props.activities.filter((act) => act.timeCategory === 'past');
                case 'current':
                    return this.props.activities.filter((act) => act.timeCategory === 'current');
                case 'future':
                    return this.props.activities.filter((act) => act.timeCategory === 'future');
                default:
                    return this.props.activities.filter((act) => act.timeCategory === 'current');
            }
        }
    }

    

    showSelected = () => {
        switch (this.state.selectedIndex) {
            case 0:
                return (
                    <ActivitiesPast 
                    activities = {this.selectActivitiesToShow('past')} 
                    showSpinner={Object.keys(this.props.activities).length === 0 ? true : false}/>
                );
            case 1:
                return (
                    <ActivitiesCurrent 
                    activities = {this.selectActivitiesToShow('current')}
                    showSpinner={Object.keys(this.props.activities).length === 0 ? true : false}/>
                );
            case 2:
                return (
                    <ActivitiesFuture 
                    activities = {this.selectActivitiesToShow('future')}
                    showSpinner={Object.keys(this.props.activities).length === 0 ? true : false}/>
                );
        
            default:
                return (
                    <ActivitiesCurrent activities = {this.selectActivitiesToShow('current')}
                    showSpinner={Object.keys(this.props.activities).length === 0 ? true : false}/>
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
