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
import Geolocation, {
  GeolocationConfiguration,
} from '@react-native-community/geolocation';
import _BackgroundTimer from 'react-native-background-timer';
import {socket} from '../../services/socket';
import {getStorage, setStorage} from '../../utils/storage';
import {useNavigation} from '@react-navigation/native';

interface Props extends LatLng {
  name: string;
}

const ShareLocation: React.FC = () => {
  const [name, setName] = useState<string>('');
  const navigation = useNavigation();
  const lastName = getStorage('name');
  const [active, setActive] = useState(false);
  const [share, setShare] = useState(false);

  const BACKGROUND_LOCATION_OPTIONS: GeolocationConfiguration = {
    skipPermissionRequests: true,
    authorizationLevel: 'always',
    locationProvider: 'auto',
    enableBackgroundLocationUpdates: true,
  };

  let watchId: any = null;

  useEffect(() => {
    lastName && setName(lastName);
    setActive(true);
    socket.on('driverConnect', data => {
      console.log('concect', data);
    });

    return () => setActive(false);
  }, []);

  const startBackgroundLocationSharing = () => {
    Geolocation.setRNConfiguration(BACKGROUND_LOCATION_OPTIONS);

    // Verifique se já existe uma instância de watchId ativa
    if (watchId === null) {
      watchId = Geolocation.watchPosition(
        position => {
          const userLocation: Props = {
            name: name,
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          };
          socket.emit('driverConnect', userLocation);
        },
        error => {
          // Lide com erros aqui, se necessário
          console.error('Erro na geolocalização:', error);
        },
        {
          enableHighAccuracy: true, // Precisão alta
          distanceFilter: 10, // Atualizar a cada 10 metros
        },
      );
    }
  };

  const stopBackgroundLocationSharing = () => {
    if (watchId !== null) {
      Geolocation.clearWatch(watchId);
      watchId = null;
    }
  };

  const startSendLocation = () => {
    setStorage('name', name);
    _BackgroundTimer.runBackgroundTimer(startBackgroundLocationSharing, 5000);
    setShare(true);
    //startBackgroundLocationSharing();
  };

  const stopSendLocation = () => {
    _BackgroundTimer.stopBackgroundTimer();
    setShare(false);
    stopBackgroundLocationSharing();
  };

  return (
    <View style={styles.container}>
      <View
        style={{
          position: 'absolute',
          top: 100,
          alignSelf: 'center',
          flexDirection: 'row',
        }}>
        {lastName && <Text style={stylesText.textBlack}>Nome: {lastName}</Text>}
        {active && <View style={styles.ball} />}
        {share && <View style={[styles.ball, {backgroundColor: 'blue'}]} />}
      </View>

      {!lastName && (
        <TextInput
          onChangeText={setName}
          style={styles.input}
          value={name}
          placeholderTextColor="#000"
          placeholder="Digite o nome do veículo"
        />
      )}
      <TouchableOpacity
        onPress={() => {
          startSendLocation();
          //navigation.navigate('Welcome');
        }}
        style={[styles.button, {backgroundColor: '#000'}]}>
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
  ball: {
    backgroundColor: 'green',
    width: 20,
    height: 20,
    alignSelf: 'center',
    borderRadius: 50,
    marginLeft: 10,
  },
});
