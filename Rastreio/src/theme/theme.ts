import {StyleSheet, Dimensions} from 'react-native';

export const theme = {
  colors: {
    black: '#000',
    white: '#fff',
  },
  screen: {
    width: Dimensions.get('screen').width,
    height: Dimensions.get('screen').height,
  }
};

export const stylesText = StyleSheet.create({
  textWhite: {
    color: theme.colors.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
  textBlack: {
    color: theme.colors.black,
  },
});
