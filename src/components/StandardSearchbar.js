import React from 'react';
import { SearchBar } from 'react-native-elements';
import { connect } from 'react-redux';
import { setCustomersSearchFilter } from '../actions/customerFilters';
import { setActivitiesSearchFilter } from '../actions/activitiesFilter';
import { Debounce } from 'react-throttle';



const StandardSearchbar = (props) => {
    // const cancelPreviousDispatch = (value) => {

    // }
    console.log(props);
    setFilter = (value) => {
        switch (props.search) {
            case 'allCustomers':
                return props.dispatch(setCustomersSearchFilter(value))
            case 'allActivities':
                return props.dispatch(setActivitiesSearchFilter(value))
            default:
                break;
        }
    }

    setPlaceholder = () => {
        switch (props.search) {
            case 'allCustomers':
                return 'Search Customers..'
            case 'allActivities':
                return 'Search Activities...'
            default:
                break;
        }
    }

    return (
        <Debounce time="100" handler="onChangeText">
            <SearchBar 
                placeholder={this.setPlaceholder()} 
                lightTheme 
                round
                onChangeText={(value) => {
                    this.setFilter(value)
                }} 
            />
        </Debounce>

    ); 
};


export default connect()(StandardSearchbar);