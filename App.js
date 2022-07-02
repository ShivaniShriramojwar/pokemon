import React, {Component} from 'react';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import Home from '././src/Home';
import ListingPage from '././src/ListingPage';
import Bookmarked from '././src/Bookmarked';

const App = createStackNavigator({
  Home: {screen: Home},
  ListingPage: {screen: ListingPage},
  Bookmarked: {screen: Bookmarked},
});

export default createAppContainer(App);
