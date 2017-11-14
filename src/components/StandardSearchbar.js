import React from 'react';
import { SearchBar } from 'react-native-elements';
import { connect } from 'react-redux';
import { setTextFilter } from '../actions/customerFilters';



const StandardSearchbar = (props) => {
    return (
        <SearchBar 
            placeholder="Search Customers..." 
            lightTheme 
            round
            value={props.filters.text}
            onChangeText={(value) => {props.dispatch(setTextFilter(value))}} 
        />
    ); 
};

const mapStateToProps = (state) => ({
    filters: state.customersFilter
});

export default connect(mapStateToProps)(StandardSearchbar);