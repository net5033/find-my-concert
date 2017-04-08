import React, { Component } from 'react';
import { AppRegistry, StyleSheet, View, Text } from 'react-native';
import Login from './Login';

export default class FindMyConcert extends Component {
  constructor() {
    super();
    this._onLogin = this._onLogin.bind(this);
    this.state = {
      isLoggedIn: false
    };
  }

  _onLogin() {
    console.log('SECOND');
    this.setState({isLoggedIn: true});
  }



  render() {
    console.log(this.state.isLoggedIn);
    if(this.state.isLoggedIn) {
      return(
        <View style={styles.container}>
          <Text style={styles.welcome}>Logged In</Text>
        </View>
      );
    }
    else {
      return (
        <Login
          onLogin={this._onLogin} 
        />
      );
    }
  }
}

let styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})

AppRegistry.registerComponent('FindMyConcert', () => FindMyConcert);
