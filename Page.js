import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  FlatList,
  Image,
} from 'react-native';

import dataset1 from './dataset1.json';
import dataset2 from './dataset2.json';

class PureItem extends React.PureComponent {
  render() {
    const { user } = this.props;
    return (
      <View style={styles.userCell}>
        <Image source={{ uri: user.picture.medium }} style={styles.userPicto} />
        <View style={styles.userInfo}>
          <Text>{`${user.name.title} ${user.name.first} ${user.name.last}`}</Text>
          <Text>{user.email}</Text>
          <Text>{`${user.phone} ${user.cell}`}</Text>
        </View>
      </View>
    );
  }
}

export default class Page extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fetching: true,
      data: [],
    };
    this.keyPrefix = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 10);
  }

  componentDidMount() {
    this.setState({ fetching: true });
    setTimeout(() => {
      const dataset = Math.random() > 0.5 ? dataset1 : dataset2;
      this.setState({ fetching: false, data: dataset });
    }, 1000);
  }

  render() {
    if (this.state.fetching) {
      return <ActivityIndicator size="small" />;
    }
    return (
        <FlatList
          data={this.state.data}
          renderItem={({ item }) => <PureItem user={item} />}
          keyExtractor={(item, index) => `${this.keyPrefix}:${item.id.value}:${index}`}
        />
    );
  }
}

const styles = StyleSheet.create({
  userCell: {
    flex: 1,
    padding: 10,
    flexDirection: 'row',
  },
  userInfo: {
    flexDirection: 'column',
    padding: 10,
  },
  userPicto: {
    flex: 0,
    width: 100,
    height: 100,
  },
});
