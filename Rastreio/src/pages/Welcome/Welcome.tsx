import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {stylesText, theme} from '../../theme/theme';
import {socket} from '../../services/socket';
import {handleStatusPermissions} from '../../utils/permissions';
import BackgroundTimer from 'react-native-background-timer';
import Geolocation from '@react-native-community/geolocation';

interface Props {
  onPress: () => void;
}
const Welcome: React.FC<Props> = ({onPress}) => {
  const [existsInterval, setExistsInterval] = useState<any>(null);

  useEffect(() => {
    handleStatusPermissions();
  }, []);

  const sendDriverLocation = () => {
    Geolocation.getCurrentPosition(position => {
      if (position) {
        // console.log(position)
        const userLocation = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        };
        socket.emit('driverLocation', userLocation);
      };
    });
  };

  const startSendLocation = () => {
    const id = BackgroundTimer.runBackgroundTimer(() => {
      sendDriverLocation();
    }, 8000);
    setExistsInterval(id);
  };

  const stopSendLocation = () => {
    if (existsInterval !== null) {
      BackgroundTimer.stopBackgroundTimer();
      setExistsInterval(null);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => {
          handleStatusPermissions();
          onPress();
        }}
        style={styles.button}>
        <Text style={stylesText.textWhite}>Ir Para o Mapa</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          handleStatusPermissions();
          startSendLocation();
        }}
        style={styles.button}>
        <Text style={stylesText.textWhite}>Compartilhar Localização</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={stopSendLocation}
        style={[styles.button, {backgroundColor: '#884137'}]}>
        <Text style={stylesText.textWhite}>
          Parar de Compartilhar Localização
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Welcome;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  button: {
    backgroundColor: theme.colors.black,
    paddingVertical: 10,
    paddingHorizontal: 40,
    borderRadius: 10,
    marginBottom: 20,
    alignItems: 'center',
  },
});
