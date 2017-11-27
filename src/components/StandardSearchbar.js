import React from 'react';
import { SearchBar } from 'react-native-elements';
import { connect } from 'react-redux';
import { setTextFilter } from '../actions/customerFilters';
import { Debounce } from 'react-throttle';



const StandardSearchbar = (props) => {
    //console.log(props);
    const cancelPreviousDispatch = (value) => {

    }
    return (
        <Debounce time="400" handler="onChangeText">
            <SearchBar 
                placeholder="Search Customers..." 
                lightTheme 
                round
                
                onChangeText={(value) => {
                    console.log(value);
                    props.dispatch(setTextFilter(value))
                }} 
            />
        </Debounce>

    ); 
};

const mapStateToProps = (state) => ({
    filters: state.customersFilter
});
// const mapDispatchToProps = (state) => ({
//     setText: 
// });

export default connect()(StandardSearchbar);