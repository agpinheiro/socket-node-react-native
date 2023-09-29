import React from 'react';
import {StyleSheet, View, Image} from 'react-native';
import {theme} from '../../../theme/theme';

interface Props {
  image: string;
}

const IconMap: React.FC<Props> = ({image}) => {
  return (
    <View style={styles.container}>
      <Image
        resizeMode="center"
        style={styles.image}
        source={{
          uri: image,
        }}
      />
    </View>
  );
};

export default IconMap;

const styles = StyleSheet.create({
  container: {
    width: 80,
    height: 80,
    backgroundColor: theme.colors.black,
    borderRadius: 40,
    borderBottomRightRadius: 1,
    transform: [{rotate: '45deg'}],
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 30,
  },
  image: {
    width: 74,
    height: 74,
    backgroundColor: theme.colors.black,
    borderRadius: 70,
    transform: [{rotate: '-45deg'}],
  },
});
