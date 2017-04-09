'use strict';

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableHighlight,
  ActivityIndicator
} from 'react-native';

import AuthService from './AuthService';

export default class Login extends Component {
  constructor(props){
    super(props);

    this.onLoginPressed = this.onLoginPressed.bind(this);
    
    this.state = {
      showProgress: false,
      err: {
        badCredentials: null,
        unknownError: null
      }
    }
  }

  onLoginPressed() {
    this.setState({
      showProgress: true
    });

    AuthService.login({
      username: this.state.username,
      password: this.state.password
    }, (results) => {
      this.setState(Object.assign({
        showProgress: false
      }, results));
      if(results.success && this.props.onLogin) {
        this.props.onLogin();
      }
    })
    
  }

  render() {
    let errorCtrl = <View />;

    if(!this.state.success && this.state.err.badCredentials) {
      errorCtrl = (
      <Text style={styles.error}>
        That username and password combination did not work
      </Text>
      );
    }

    if(!this.state.success && this.state.err.unknownError) {
      errorCtrl = (
      <Text style={styles.error}>
        We experienced an unexpected issue
      </Text>
      );
    }

    return(
      <View style={styles.container}>
        <Image 
          style={styles.logo}
          source={require('../img/Octocat.png')}
        />
        <Text style={styles.heading}>
          Github Browser
        </Text>
        <TextInput 
          style={styles.input}
          placeholder="Github Username"
          onChangeText={(text) => this.setState({username: text})}
        />
        <TextInput
          style={styles.input}
          placeholder="Github Password"
          secureTextEntry={true}
          onChangeText={(text) => this.setState({password: text})}
        />
        <TouchableHighlight
          style={styles.button}
          onPress={this.onLoginPressed}
        > 
          <Text style={styles.buttonText}>
            Log In
          </Text>
        </TouchableHighlight>
        {errorCtrl}
        <ActivityIndicator
          animating={this.state.showProgress}
          size="large"
          style={styles.loader}
        />
      </View>
    );
  }
}

let styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    padding: 10,
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  logo: {
    width: 66,
    height: 55
  },
  heading: {
    fontSize: 30,
    marginTop: 10
  },
  input: {
    height: 50,
    marginTop: 10,
    padding: 4,
    fontSize: 18,
    borderWidth: 1,
    borderColor: '#48BBEC'
  },
  button: {
    height: 50,
    backgroundColor: '#48BBEC',
    alignSelf: 'stretch',
    marginTop: 10,
    justifyContent: 'center'
  },
  buttonText: {
    fontSize: 22,
    color: '#FFF',
    alignSelf: 'center'
  },
  loader: {
    marginTop: 20
  },
  error: {
    color: '#F00',
    marginTop: 10
  }
});