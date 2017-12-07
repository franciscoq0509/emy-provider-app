import React from 'react';
import { View, Text, Image } from 'react-native';

const Header = ()=> {
    const { wrapper, text } = styles;
   return ( 
        <View style={wrapper}>
            <Image
            style={{width: 300, resizeMode: 'contain'}}
                source={require('../assets/logo-white-LG.png')}
            />
        </View>
   );
};

const styles = {
    wrapper : {
        //paddingBottom: 10,
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