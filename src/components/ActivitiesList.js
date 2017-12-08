import React from 'react';
import { View, Text } from 'react-native';
import { TabNavigator, addNavigationHelpers } from 'react-navigation';
import { Icon, ButtonGroup } from 'react-native-elements';
import Header from './Header';


const ActivitiesPast = () => {
    return (
        <Text>This is past activities</Text>
    );
}

const ActivitiesCurrent = () => {
    return (
        <Text>This is current activities</Text>
    );
}

const ActivitiesFuture = () => {
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

    

    showSelected = () => {
        switch (this.state.selectedIndex) {
            case 0:
                return (
                    <ActivitiesPast />
                );
            case 1:
                return (
                    <ActivitiesCurrent />
                );
            case 2:
                return (
                    <ActivitiesFuture />
                );
        
            default:
                return (
                    <ActivitiesCurrent />
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
