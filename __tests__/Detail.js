/**
 * Jest tests for the Detail component
 */

'use strict';

import 'react-native';
import React from 'react';
import Detail from '../src/Detail';
import data from './response.json';

import renderer from 'react-test-renderer';

it('renders correctly', () => {
  const tree = renderer.create(
    <Detail data={ data }/>
  ).toJSON();
  expect(tree).toMatchSnapshot();
});

it('renders initial price correctly', () => {
  const Text = require('Text');
  const tree = renderer.create(
      <Text
        accessible={true}
        allowFontScaling={true}
        ellipsizeMode="tail"
        style={
          {
            "textDecorationLine": "line-through",
          }
        }>
        $
        29.00
      </Text>
  ).toJSON();
  expect(tree).toMatchSnapshot();
});

it('renders promo price correctly', () => {
  const Text = require('Text');
  const tree = renderer.create(
      <Text
        accessible={true}
        allowFontScaling={true}
        ellipsizeMode="tail"
        style={
          {
            "fontSize": 20,
          }
        }>
        only here
         $
        4.00
      </Text>
  ).toJSON();
  expect(tree).toMatchSnapshot();
});

it('renders item category correctly', () => {
  const Text = require('Text');
  const tree = renderer.create(
      <Text
        accessible={true}
        allowFontScaling={true}
        ellipsizeMode="tail"
        style={undefined}>
        Beauty & Health
      </Text>
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
