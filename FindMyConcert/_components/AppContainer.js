import React, { Component } from 'react';
import { View, Text, StyleSheet, TabBarIOS, NavigatorIOS } from 'react-native';
import Feed from './Feed';

export default class AppContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTab: 'feed'
    }
  }

  render() {
    return(
      <TabBarIOS style={styles.container}>
        <TabBarIOS.Item
          title="Feed"
          selected={this.state.selectedTab == 'feed'}
          icon={require('../img/inbox.png')}
          onPress={() => this.setState({ selectedTab: 'feed' })}
        >
          <NavigatorIOS
            style={styles.navigator}
            initialRoute={{
              component: Feed,
              title: 'Feed'
            }}
          />
        </TabBarIOS.Item>
        <TabBarIOS.Item
          title="Search"
          selected={this.state.selectedTab == 'search'}
          icon={require('../img/search.png')}
          onPress={() => this.setState({ selectedTab: 'search' })}
        >
          <Text style={styles.welcome}>Tab 2</Text>
        </TabBarIOS.Item>
      </TabBarIOS>
    );
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
  },
  navigator: {
    flex: 1
  }
});