import React from 'react';
import { Button } from 'react-native-elements';

export const SubmitButton = (props) => {
    return (
    <Button
        raised
        title='Submit'
        onPress={() => props.pressed()}
    />
    );
}