import React from 'react';
import {StyleSheet, View, Image, Text} from 'react-native';
import {theme} from '../../../theme/theme';

interface Props {
  image: string;
  name: string;
}

const IconMap: React.FC<Props> = ({image, name}) => {
  return (
    <>
      <View style={styles.container}>
        <Image
          resizeMode="center"
          style={styles.image}
          source={{
            uri: image,
          }}
        />
      </View>
      <Text numberOfLines={1} style={styles.text}>
        {name}
      </Text>
    </>
  );
};

export default IconMap;

const styles = StyleSheet.create({
  container: {
    width: 60,
    height: 60,
    backgroundColor: theme.colors.black,
    borderRadius: 40,
    borderBottomRightRadius: 1,
    transform: [{rotate: '45deg'}],
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 30,
  },
  image: {
    width: 56,
    height: 56,
    backgroundColor: theme.colors.black,
    borderRadius: 70,
    transform: [{rotate: '-45deg'}],
  },
  text: {
    backgroundColor: '#000',
    color: '#FFF',
    fontSize: 12,
    fontWeight: 'bold',
    borderRadius: 10,
    paddingHorizontal: 10,
    textAlignVertical: 'center',
    maxWidth: 300,
  },
});
