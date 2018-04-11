
import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';
import LoginFrom from './src/container/Login';

export default class App extends Component {
  render() {
    return (
      <LoginFrom/>
    );
  }
}

const styles = StyleSheet.create({

});
