import React from 'react';
import { AppRegistry, AsyncStorage } from 'react-native';
import AppIndex from './src/components/AppIndex';

AsyncStorage.removeItem('USER_TOKEN');
console.log('running android');

AppRegistry.registerComponent('provider_app', () => AppIndex);
