import React from 'react';
import { SearchBar } from 'react-native-elements';
import { connect } from 'react-redux';
import { setTextFilter } from '../actions/customerFilters';
import { Throttle } from 'react-throttle';



const StandardSearchbar = (props) => {
    console.log(props);
    return (
        <Throttle time="100" handler="onChangeText">
            <SearchBar 
                placeholder="Search Customers..." 
                lightTheme 
                round

                onChangeText={(value) => {props.dispatch(setTextFilter(value))}} 
            />
        </Throttle>
    ); 
};

const mapStateToProps = (state) => ({
    filters: state.customersFilter
});

export default connect()(StandardSearchbar);