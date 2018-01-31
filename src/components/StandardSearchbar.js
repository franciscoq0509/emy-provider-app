import React from 'react';
import { View } from 'react-native'
import { SearchBar } from 'react-native-elements';
import { connect } from 'react-redux';
import { setCustomersSearchFilter } from '../actions/customerFilters';
import { setActivitiesSearchFilter } from '../actions/activitiesFilter';

const StandardSearchbar = (props) => {
    returnSearchBar = (value) => {
        switch (props.search) {
            case 'allCustomers':
                return (
                        <SearchBar 
                            containerStyle={{marginBottom: -25, paddingBottom: 5, backgroundColor: '#fff'}}
                            placeholder={this.setPlaceholder()} 
                            clearIcon={{color:'#86939e', name:'clear'}}
                            lightTheme 
                            round
                            onChangeText={(value) => {
                                return props.dispatch(setCustomersSearchFilter(value))
                            }} 
                        />
                );  
            case 'allActivities':
                return (
                        <SearchBar 
                            placeholder={this.setPlaceholder()} 
                            lightTheme 
                            round
                            onChangeText={(value) => {
                                return props.dispatch(setActivitiesSearchFilter(value))
                            }} 
                        />
                );
            default:
                return null;
        }
    }

    setPlaceholder = () => {
        switch (props.search) {
            case 'allCustomers':
                return 'Search Customers..'
            case 'allActivities':
                return 'Search Activities...'
            default:
                return 'Search...'
        }
    }

    return (
            <View>
                {this.returnSearchBar()}
            </View>
    );

     
};


export default connect()(StandardSearchbar);

