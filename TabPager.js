import React, { Component, PropTypes } from 'react';
import {
  View,
  ScrollView,
  Platform,
  ViewPagerAndroid,
  Dimensions,
} from 'react-native';

import TabBar from './TabBar';

import styles from './TabPager.css';


class TabPager extends Component {
  constructor(props) {
    super(props);

    this.selectPage = this.selectPage.bind(this);
    this.onPageScroll = this.onPageScroll.bind(this);
    this.onPageSelected = this.onPageSelected.bind(this);

    this.tabBarRef = null;
    this.pagerRef = null;

    this.componentWillReceiveProps(this.props);
  }

  componentWillReceiveProps({ initialPage, pagerWidth }) {
    this.currentPage = initialPage || 0;
    this.pagerWidth = pagerWidth || Dimensions.get('window').width;
  }

  onPageScroll(e) {
    const { offset, position } = e.nativeEvent;
    const scroll = position + offset;
    if (this.tabBarRef) {
      this.tabBarRef.onPageScroll(scroll);
    }
    if (this.props.onPageScroll) {
      this.props.onPageScroll(e);
    }
  }

  onPageSelected(page) {
    const selected = page.nativeEvent.position;
    if (this.currentPage === selected) {
      return;
    }

    this.currentPage = page.nativeEvent.position;
    if (this.tabBarRef) {
      this.tabBarRef.selectTab(this.currentPage);
    }
    if (this.props.onPageSelected) {
      this.props.onPageSelected(this.currentPage);
    }
  }

  getCurrentPage() {
    return this.props.pages[this.currentPage];
  }

  selectPage(pageIndex) {
    if (this.currentPage === pageIndex) {
      return;
    }

    this.currentPage = pageIndex;

    if (Platform.OS === 'ios') {
      this.pagerRef.scrollTo({ x: pageIndex * this.pagerWidth, animated: false });
    } else if (Platform.OS === 'android') {
      this.pagerRef.setPage(pageIndex);
    }

    /*const { onPageSelected } = this.props;
    if (onPageSelected) {
      onPageSelected(this.currentPage);
    }*/
  }

  renderPager() {
    const { pages, style, initialPage } = this.props;
    const pageNodes = pages.map(page => page.render());

    if (Platform.OS === 'android') {
      return (
        <ViewPagerAndroid
          ref={(c) => { this.pagerRef = c; }}
          style={style}
          initialPage={initialPage || 0}
          onPageScroll={this.onPageScroll}
          onPageSelected={this.onPageSelected}
        >
          {pageNodes}
        </ViewPagerAndroid>
      );
    } else if (Platform.OS === 'ios') {
      return (
        <ScrollView
          ref={(c) => { this.pagerRef = c; }}
          style={style}
          scrollEnabled={false}
          pagingEnabled
          horizontal
        >
          {pageNodes}
        </ScrollView>
      );
    }
    return null;
  }

  renderTabBar() {
    const { tabBar, pages, initialPage, pagerWidth } = this.props;
    if (tabBar !== 'none') {
      return (
        <TabBar
          pages={pages}
          initialPage={initialPage || 0}
          pagerWidth={pagerWidth}
          onSelectTab={this.selectPage}
          ref={(c) => { this.tabBarRef = c; }}
        />
      );
    }
  }

  render() {
    const { pages, tabBar, containerStyle } = this.props;
    if (pages.length === 0) {
      throw new Error('TabPager: no page defined');
    }

    this.pages = pages.map(page => page.render());

    const pagerNode = this.renderPager();
    const tabBarNode = this.renderTabBar();

    if (tabBar === 'top') {
      return <View style={[styles.container, containerStyle]}>{tabBarNode}{pagerNode}</View>;
    }
    return <View style={[styles.container, containerStyle]}>{pagerNode}{tabBarNode}</View>;
  }
}

TabPager.propTypes = {
  pages: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
    render: PropTypes.func.isRequired,
  })).isRequired,
  initialPage: PropTypes.number,
  tabBar: PropTypes.oneOf(['none', 'top', 'bottom']),
  renderTabTitle: PropTypes.func,
  onPageSelected: PropTypes.func,
  onPageScroll: PropTypes.func,
  style: PropTypes.any,
  containerStyle: PropTypes.any,
  pagerWidth: PropTypes.number,
};

TabPager.defaultProps = {
  initialPage: 0,
  tabBar: 'top',
  pagerWidth: null,
  renderTabTitle: null,
  onPageSelected: null,
  onPageScroll: null,
  style: null,
  containerStyle: null,
};
export default TabPager;
