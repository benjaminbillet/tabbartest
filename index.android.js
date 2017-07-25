import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

import TabPager from './TabPager'
import Page from './Page';

export default class tabbartest extends Component {
  render() {
    const pages = [{
      title: 'Page 1',
      render: () => <Page key="page1" />,
    }, {
      title: 'Page 2',
      render: () => <Page key="page2" />,
    }];
    return (
      <View style={styles.container}>
        <TabPager pages={pages} style={styles.pager} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  pager: {
  }
});

AppRegistry.registerComponent('tabbartest', () => tabbartest);
