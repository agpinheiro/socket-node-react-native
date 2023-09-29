import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import MapView, {LatLng, Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import {stylesText, theme} from '../../theme/theme';
import mapStyle from './mapStyle.json';
import Geolocation from '@react-native-community/geolocation';
import IconMap from './components/IconMap';
import {socket} from '../../services/socket';

interface Props {
  setReturn: () => void | Dispatch<SetStateAction<boolean>>;
}

const Maps: React.FC<Props> = ({setReturn}) => {
  const [userLocation, setUserLocation] = useState<LatLng>();
  const [busLocation, setBusLocation] = useState<LatLng>();
  const mapRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      Geolocation.getCurrentPosition(position => {
        if (position) {
          setUserLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        }
      });
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    socket.on('driverLocation', data => {
      console.log(data);
      setBusLocation(data);
    });
  }, []);

  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        ref={mapRef}
        style={styles.maps}
        customMapStyle={mapStyle}
        showsMyLocationButton
        initialRegion={{
          latitude: -9.387738,
          longitude: -40.52541,
          latitudeDelta: 0.09,
          longitudeDelta: 0.09,
        }}>
        {busLocation && (
          <Marker
            key={'bus'}
            coordinate={{
              latitude: busLocation.latitude,
              longitude: busLocation.longitude,
            }}
            style={styles.marker}>
            <IconMap image="https://i0.wp.com/diariodotransporte.com.br/wp-content/uploads/2022/02/Chede-Baruch-Nascimento-Onibus-Brasil.jpg?fit=796%2C554&ssl=1" />
          </Marker>
        )}

        {userLocation && (
          <Marker
            key={'user'}
            coordinate={{
              latitude: userLocation.latitude,
              longitude: userLocation.longitude,
            }}
            style={styles.marker}>
            <IconMap image="https://static.vecteezy.com/system/resources/thumbnails/008/442/086/small/illustration-of-human-icon-user-symbol-icon-modern-design-on-blank-background-free-vector.jpg" />
          </Marker>
        )}
      </MapView>
      <TouchableOpacity onPress={setReturn} style={styles.button}>
        <Text style={stylesText.textWhite}>Voltar</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Maps;

const styles = StyleSheet.create({
  container: {
    height: theme.screen.height,
    width: theme.screen.width,
  },
  maps: {
    flex: 1,
  },
  marker: {
    alignItems: 'center',
  },
  button: {
    backgroundColor: theme.colors.black,
    padding: 10,
    position: 'absolute',
    bottom: 45,
    right: 15,
    zIndex: 2,
    borderRadius: 10,
  },
});
