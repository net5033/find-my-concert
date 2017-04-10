import React, { Component } from 'react';
import { View, Text, ListView, StyleSheet, ActivityIndicator, Image, TouchableHighlight } from 'react-native';
import AuthService from './AuthService';
import moment from 'moment';
import PushPayload from './PushPayload'

export default class Feed extends Component {
  constructor(props) {
    super(props);
    this.fetchFeed = this.fetchFeed.bind(this);
    let ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => {
        r1 != r2
      }
    });
    this.state = {
      dataSource: ds,
      showProgress: true
    }
  }

  componentWillMount() {
    this.fetchFeed();
  }

  fetchFeed() {
    let feedItems;
    AuthService.getAuthInfo((err, authInfo) => {
      let url = 'https://api.github.com/users/' + authInfo.user.login + '/events';

      fetch(url, {
        headers: authInfo.header
      })
      .then((response) => {
        return response.json();
      })
      .then((responseData) => {
        feedItems = responseData.filter((ev) => {
          if (ev.type === 'PushEvent') {
            return ev;
          }
        })
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(feedItems),
          showProgress: false
        });
      })
    })
  }

  pressRow(rowData) {
    this.props.navigator.push({
      title: 'Push Event',
      component: PushPayload,
      passProps: {
        pushEvent: rowData
      }
    })
  }

  renderRow(rowData) {
    return(
      <TouchableHighlight
        onPress={() => this.pressRow(rowData)}
        underlayColor='#DDD'
      >
        <View style={styles.rowView}>
          <Image
            source={{uri: rowData.actor.avatar_url}}
            style={styles.profileImg}
            />
            <View style={styles.rowItem}>
              <Text style={styles.rowText}>
                {moment(rowData.created_at).fromNow()}
              </Text>
              <Text style={styles.rowText}>
                {rowData.actor.login} pushed to
              </Text>
              <Text style={styles.rowText}>
                {rowData.payload.ref.replace('refs/heads/', '')}
              </Text>
              <Text style={styles.rowText}>
                at {rowData.repo.name}
              </Text>
            </View>
        </View>
      </TouchableHighlight>
    )
  }

  render() {
    if (this.state.showProgress) {
      return(
        <View style={styles.spinnerView}>
          <ActivityIndicator
            size="large"
            animating={true}
          />
        </View>
      );
    }
    return(
      <View style={styles.viewContainer}>
        <View style={styles.headerContainer}>
          <Text style={styles.headerText}>Feed</Text>
        </View>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this.renderRow.bind(this)}
          enableEmptySections={true}
        />
      </View>
    )
  }
}

let styles = StyleSheet.create({
  viewContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    paddingTop: 20
  },
  rowView: {
    flex: 1,
    flexDirection: 'row',
    padding: 20,
    alignItems: 'center',
  },
  spinnerView: {
    flex: 1,
    justifyContent: 'center'
  },
  profileImg: {
    height: 36,
    width: 36,
    borderRadius: 18
  },
  rowItem: {
    paddingLeft: 20
  },
  headerText: {
    fontWeight: '600',
    backgroundColor: '#FFF',
    borderBottomWidth: 1,
    borderColor: '#D7D7D7',
  },
  headerContainer: {
    backgroundColor: '#FFF',
    alignItems: 'center',
    justifyContent: 'center'
  }
})