import React from 'react';
import { AppRegistry, AsyncStorage } from 'react-native';
import AppIndex from './src/components/AppIndex';
import {_ENV_, setProviderGuid} from './src/config/_ENV_';

AsyncStorage.removeItem('USER_TOKEN');
console.log('running android');

if(__DEV__) {
    setProviderGuid('jerrys-gym');
} else {
    setProviderGuid('jerrys-gym');
}

AppRegistry.registerComponent('provider_app', () => AppIndex);
