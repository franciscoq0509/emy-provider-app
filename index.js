import React from 'react';
import { AppRegistry } from 'react-native';
import RootNavigator from './src/navigator/RootNavigator';

const jsx = (
        <RootNavigator />
);


AppRegistry.registerComponent('provider_app', () => RootNavigator);
