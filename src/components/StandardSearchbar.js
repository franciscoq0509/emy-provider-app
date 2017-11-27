import React from 'react';
import { SearchBar } from 'react-native-elements';
import { connect } from 'react-redux';
import { setTextFilter } from '../actions/customerFilters';
import { Debounce } from 'react-throttle';



const StandardSearchbar = (props) => {
    const cancelPreviousDispatch = (value) => {

    }
    return (
        <Debounce time="600" handler="onChangeText">
            <SearchBar 
                placeholder="Search Customers..." 
                lightTheme 
                round
                
                onChangeText={(value) => {
                    props.dispatch(setTextFilter(value))
                }} 
            />
        </Debounce>

    ); 
};


export default connect()(StandardSearchbar);