import React from 'react';
import Button from 'react-native-button';

export const SubmitButton = (props) => {

    _pressed = () => {
        props.pressed();
    }

    return (
    <Button
        containerStyle={{backgroundColor: '#FF9800', padding:20, height:50, width: 200, justifyContent: 'center', alignSelf: 'center', borderRadius:4}}
        onPress={this._pressed}
        style={{color:'#fff'}}
    >
    Submit
    </Button>
    );
}

