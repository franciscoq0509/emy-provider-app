import React from 'react';
import { View } from 'react-native'
import { SearchBar } from 'react-native-elements';
import { connect } from 'react-redux';
import { setCustomersSearchFilter } from '../actions/customerFilters';
import { setActivitiesSearchFilter } from '../actions/activitiesFilter';
import { Debounce } from 'react-throttle';


//comment
const StandardSearchbar = (props) => {
    // const cancelPreviousDispatch = (value) => {

    // }
    console.log(props);
    returnSearchBar = (value) => {
        switch (props.search) {
            case 'allCustomers':
                return (
                    <Debounce time="100" handler="onChangeText">
                        <SearchBar 
                            placeholder={this.setPlaceholder()} 
                            lightTheme 
                            round
                            onChangeText={(value) => {
                                return props.dispatch(setCustomersSearchFilter(value))
                            }} 
                        />
                    </Debounce>
                );  
            case 'allActivities':
                return (
                    <Debounce time="100" handler="onChangeText">
                        <SearchBar 
                            placeholder={this.setPlaceholder()} 
                            lightTheme 
                            round
                            onChangeText={(value) => {
                                return props.dispatch(setActivitiesSearchFilter(value))
                            }} 
                        />
                    </Debounce>
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