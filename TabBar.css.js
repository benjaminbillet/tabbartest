import { StyleSheet } from 'react-native';

export const BAR_SEP_COLOR = '#ccc';
export const ACTIVE_TEXT_COLOR = '#151b54';
export const INACTIVE_TEXT_COLOR = '#000';
export const TAB_UNDERLINE_COLOR = '#151b54';
export const TAB_UNDERLINE_HEIGHT = 4;
export const BACKGROUND_COLOR = '#fff';

export default StyleSheet.create({
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 10,
  },
  tabs: {
    height: 50,
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderWidth: 1,
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderBottomColor: BAR_SEP_COLOR,
    backgroundColor: BACKGROUND_COLOR,
  },
  button: {
    flex: 1,
  },
});
