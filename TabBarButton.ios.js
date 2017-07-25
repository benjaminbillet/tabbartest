import React from 'react';
import { TouchableOpacity } from 'react-native';

const TabBarButton = props => (
  <TouchableOpacity {...props}>
    {props.children}
  </TouchableOpacity>
);

export default TabBarButton;
