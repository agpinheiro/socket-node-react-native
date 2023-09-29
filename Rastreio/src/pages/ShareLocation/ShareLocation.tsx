import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  Text,
} from 'react-native';
import {stylesText, theme} from '../../theme/theme';
import {LatLng} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import _BackgroundTimer from 'react-native-background-timer';
import {socket} from '../../services/socket';
import {getStorage, setStorage} from '../../utils/storage';
import {useNavigation} from '@react-navigation/native';

interface Props extends LatLng {
  name: string;
}

const ShareLocation: React.FC = () => {
  const [name, setName] = useState<string>('');
  const [active, setActive] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    const lastName = getStorage('name');
    lastName && setName(lastName);
    socket.on('driverConnect', data => {
      // console.log(data);
    });
  }, []);

  const sendDriverLocation = () => {
    Geolocation.watchPosition(
      position => {
        if (position) {
          // console.log(position)
          const userLocation: Props = {
            name: name,
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          };
          socket.emit('driverConnect', userLocation);
        }
      },
      error => {
        console.error(
          `Erro na obtenção da localização do motorista ${name}: ${error.message}`,
        );
      },
      {
        enableHighAccuracy: true, // Precisão alta
        distanceFilter: 20, // Atualizar a cada 10 metros
      },
    );
  };

  const startSendLocation = () => {
    setStorage('name', name);
    setActive(true);
    if (!active) {
      _BackgroundTimer.runBackgroundTimer(sendDriverLocation, 65000);
    }
  };

  const stopSendLocation = () => {
    setActive(false);
    _BackgroundTimer.stopBackgroundTimer();
  };

  return (
    <View style={styles.container}>
      <TextInput
        onChangeText={setName}
        style={styles.input}
        value={name}
        placeholderTextColor="#000"
        placeholder="Digite o nome do veículo"
      />
      <TouchableOpacity
        onPress={() => {
          startSendLocation();
          navigation.navigate('Welcome');
        }}
        style={[styles.button, {backgroundColor: active ? '#011586' : '#000'}]}>
        <Text style={stylesText.textWhite}>
          {active ? 'Compartilhando' : 'Compartilhar Localização'}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={stopSendLocation}
        style={[
          styles.button,
          {backgroundColor: active ? '#bd4333' : '#884137'},
        ]}>
        <Text style={stylesText.textWhite}>
          Parar de Compartilhar Localização
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default ShareLocation;

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
  input: {
    backgroundColor: '#fefefe',
    borderRadius: 10,
    marginBottom: 20,
    paddingHorizontal: 40,
    marginHorizontal: 10,
    color: '#000',
  },
});
