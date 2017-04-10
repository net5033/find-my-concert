import React, { Component } from 'react';
import { View, Text, ListView, StyleSheet, Image } from 'react-native';
import AuthService from './AuthService';
import moment from 'moment';

export default class PushPayload extends Component {
  constructor(props) {
    super(props);
    let ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => {
        r1 != r2
      }
    });
    this.state = {
      dataSource: ds
    }
  }

  renderRow(rowData) {
    return(
      <View style={styles.funRow}>
        <Text>{rowData.sha.substring(0, 6)} - {rowData.message}</Text>
      </View>
    );
  }


  render() {
    return(
      <View style={styles.pushPayloadContainer}>
        <Image
          source={{uri: this.props.pushEvent.actor.avatar_url}}
          style={styles.bigProfPic}
        />
        <Text style={styles.labelText}>
          {moment(this.props.pushEvent.created_at).fromNow()}
        </Text>
        <Text>
          {this.props.pushEvent.actor.login} pushed to
        </Text>
        <Text>
          {this.props.pushEvent.payload.ref.replace('refs/heads/', '')}
        </Text>
        <Text style={styles.rowText}>
          at {this.props.pushEvent.repo.name}
        </Text>
        <Text>
          {this.props.pushEvent.payload.commits.length} Commits
        </Text>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this.renderRow.bind(this)}
        />
      </View>
    );
  }
}

let styles = StyleSheet.create({
  pushPayloadContainer: {
    flex: 1,
    paddingTop: 80,
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  bigProfPic: {
    height: 120,
    width: 120,
    borderRadius: 60
  },
  labelText: {
    paddingTop: 20,
    paddingBottom: 20,
    fontSize: 20
  },
  funRow: {
    flex: 1,
    justifyContent: 'center'
  }
})


