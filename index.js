import React from 'react';
import { AppRegistry } from 'react-native';
import RootNavigator from './src/navigator/RootNavigator';
import { Provider } from 'react-redux';
//import configureStore from './src/store/configureStore';

//const store = configureStore();

const jsx = (
        <RootNavigator />
);


AppRegistry.registerComponent('provider_app', () => RootNavigator);
