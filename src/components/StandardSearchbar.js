import React from 'react';
import { SearchBar } from 'react-native-elements';


export const StandardSearchbar = (props) => {
    console.log(props.search);
    return <SearchBar placeholder="Search Customers..." lightTheme round />; //bind the value to a dispatch that sets the filters.searchAllCustomers prop.
};