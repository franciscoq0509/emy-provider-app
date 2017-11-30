import React from 'react';
import { View, Text } from 'react-native';

const Header = ()=> {
    const { wrapper, text } = styles;
   return ( 
        <View style={wrapper}>
            <Text style={text}>Enrolmy</Text>
        </View>
   );
};

const styles = {
    wrapper : {
        paddingTop: 10,
        paddingBottom: 10,
        //marginTop: 20,
        alignItems: 'center',
        backgroundColor: '#3197EA',
        width: '100%',
        alignSelf: 'center'
    },
    text : {
        fontSize: 12,
        color: '#fff'
    }
}

export default Header;