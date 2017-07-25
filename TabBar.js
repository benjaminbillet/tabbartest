import React, { Component, PropTypes } from 'react';
import {
  Text,
  View,
  Animated,
  Platform,
  Dimensions,
} from 'react-native';

import TimerMixin from 'react-timer-mixin';

import styles, { ACTIVE_TEXT_COLOR, INACTIVE_TEXT_COLOR, TAB_UNDERLINE_COLOR, TAB_UNDERLINE_HEIGHT } from './TabBar.css';

import TabBarButton from './TabBarButton';

class TabBar extends Component {
  constructor(props) {
    super(props);

    this.onSelectTab = this.onSelectTab.bind(this);

    this.pagerScrollX = new Animated.Value(0);
    this.componentWillReceiveProps(this.props);
  }

  componentWillReceiveProps({ pages, initialTab, pagerWidth }) {
    this.currentTab = initialTab || 0;
    this.pagerWidth = pagerWidth || Dimensions.get('window').width;
    this.tabWidth = this.pagerWidth / pages.length;
  }

  onSelectTab(tabIndex) {
    if (this.isActiveTab(tabIndex)) {
      return;
    }

    this.currentTab = tabIndex;

    if (Platform.OS === 'ios') {
      this.onPageScroll(tabIndex); // simulate a pager scroll
    }

    if (this.props.onSelectTab) {
      this.props.onSelectTab(tabIndex);
    }
  }

  onPageScroll(offset) {
    this.pagerScrollX.setValue(offset);
  }

  isActiveTab(tabIndex) {
    return this.currentTab === tabIndex;
  }

  selectTab(tabIndex) {
    this.onSelectTab(tabIndex);
  }

  renderTabItem(tabTitle, tabIndex) {
    return (
      <TabBarButton
        style={styles.button}
        key={tabTitle}
        accessible
        accessibilityLabel={tabTitle}
        accessibilityTraits="button"
        onPress={() => this.onSelectTab(tabIndex)}
      >
        {this.renderTab(tabTitle, tabIndex)}
      </TabBarButton>
    );
  }

  render() {
    const { style, pages, underlineHeight, underlineColor } = this.props;
    const underlineStyle = {
      position: 'absolute',
      left: 0,
      bottom: 0,
      width: this.tabWidth,
      height: underlineHeight,
      backgroundColor: underlineColor,
      transform: [{
        translateX: this.pagerScrollX.interpolate({
          inputRange: [0, 1],
          outputRange: [0, this.tabWidth],
        }),
      }],
    };

    const tabsStyle = [
      styles.tabs,
      style,
    ];

    let content = pages.map((page, tabIndex) => this.renderTabItem(page.title, tabIndex));
    content.push(<Animated.View style={underlineStyle} key="tabUnderline" />);
    return (
      <View style={[styles.tabs, style]}>
        {content}
      </View>
    );
  }

  renderTab(tabTitle, tabIndex) {
    const { tabStyle, textStyle, renderTab } = this.props;
    if (renderTab != null) {
      return renderTab(tabTitle, tabIndex, this);
    }

    return (
      <View style={[styles.tab, tabStyle]}>
        <Text style={textStyle}>
          {tabTitle}
        </Text>
      </View>
    );
  }
}

TabBar.propTypes = {
  pages: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
    render: PropTypes.func.isRequired,
  })).isRequired,
  onSelectTab: PropTypes.func,
  initialTab: PropTypes.number,
  pagerWidth: PropTypes.number,
  activeTextColor: PropTypes.string,
  inactiveTextColor: PropTypes.string,
  underlineColor: PropTypes.string,
  underlineHeight: PropTypes.number,
  style: PropTypes.any,
  tabStyle: PropTypes.any,
  textStyle: PropTypes.any,
  renderTab: PropTypes.func,
};

TabBar.defaultProps = {
  onSelectTab: null,
  initialTab: 0,
  pagerWidth: null,
  activeTextColor: ACTIVE_TEXT_COLOR,
  inactiveTextColor: INACTIVE_TEXT_COLOR,
  underlineColor: TAB_UNDERLINE_COLOR,
  underlineHeight: TAB_UNDERLINE_HEIGHT,
  style: null,
  tabStyle: null,
  textStyle: null,
  renderTab: null,
};

export default TabBar;
