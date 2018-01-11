import React from 'react';
import { View, Text, Image } from 'react-native';

const Header = ()=> {
    const { wrapper, text } = styles;
   return ( 
        <View style={wrapper}>
            <Image
            style={{width: 300, height: 50, resizeMode: 'contain'}}
                source={require('../assets/logo-white-LG.png')}
            />
        </View>
   );
};

const styles = {
    wrapper : {
        alignItems: 'center',
        backgroundColor: '#3197EA',
        width: '100%',
        height: 50,
        alignSelf: 'center'
    },
    text : {
        fontSize: 12,
        color: '#fff'
    }
}

export default Header;