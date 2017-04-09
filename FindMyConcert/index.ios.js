import React, { Component } from 'react';
import { AppRegistry, StyleSheet, View, Text, ActivityIndicator } from 'react-native';
import Login from './_components/Login';
import AuthService from './_components/AuthService';
import AppContainer from './_components/AppContainer';

export default class FindMyConcert extends Component {
  constructor() {
    super();
    this._onLogin = this._onLogin.bind(this);
    this.state = {
      isLoggedIn: false,
      checkingAuth: true
    };
  }
  
  componentDidMount() {
    AuthService.getAuthInfo((err, authInfo) => {
      this.setState({
        checkingAuth: false,
        isLoggedIn: authInfo != null
      });
    });
  }

  _onLogin() {
    this.setState({isLoggedIn: true});
  }



  render() {
    if(this.state.checkingAuth) {
      return (
        <View style={styles.container}>
          <ActivityIndicator
            animating={true}
            size="large"
            style={styles.loader}
          />
        </View>
      )
    }
    if(this.state.isLoggedIn) {
      return(
       <AppContainer />
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
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10
  }
});

AppRegistry.registerComponent('FindMyConcert', () => FindMyConcert);
