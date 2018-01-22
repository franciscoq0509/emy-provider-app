import React from 'react';
import { Button } from 'react-native-elements';

export const SubmitButton = (props) => {

    _pressed = () => {
        props.pressed();
    }

    return (
    <Button
        raised
        title='Submit'
        onPress={this._pressed}
    />
    );
}

