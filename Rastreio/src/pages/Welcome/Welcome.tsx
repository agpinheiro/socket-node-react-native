import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {stylesText, theme} from '../../theme/theme';
import {socket} from '../../services/socket';
import {handleStatusPermissions} from '../../utils/permissions';
import BackgroundTimer from 'react-native-background-timer';
import Geolocation from '@react-native-community/geolocation';
import {useNavigation} from '@react-navigation/native';

const Welcome: React.FC = () => {
  const navigate = useNavigation();
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => {
          handleStatusPermissions();
          navigate.navigate('Maps');
        }}
        style={styles.button}>
        <Text style={stylesText.textWhite}>Ir Para o Mapa</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          handleStatusPermissions();
          navigate.navigate('SharedLocation');
        }}
        style={styles.button}>
        <Text style={stylesText.textWhite}>Compartilhar Localização</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Welcome;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: theme.colors.black,
    paddingVertical: 10,
    paddingHorizontal: 40,
    borderRadius: 10,
    marginBottom: 20,
    alignItems: 'center',
    marginHorizontal: 10,
  },
});
