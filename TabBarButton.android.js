import React from 'react';
import { TouchableNativeFeedback } from 'react-native';

const TabBarButton = props => (
  <TouchableNativeFeedback
    delayPressIn={0}
    background={TouchableNativeFeedback.SelectableBackground()}
    {...props}
  >
    {props.children}
  </TouchableNativeFeedback>
);

export default TabBarButton;
