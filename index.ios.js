/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import Index from './src/Index';
import { AppRegistry } from 'react-native';

export default class GiveMeCoupons extends Component {
  render() {
    return (
      <Index />
    );
  }
}

AppRegistry.registerComponent('GiveMeCoupons', () => GiveMeCoupons);
