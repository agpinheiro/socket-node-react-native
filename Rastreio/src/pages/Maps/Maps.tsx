import React, {useEffect, useRef, useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import MapView, {LatLng, Marker, PROVIDER_GOOGLE, Ani} from 'react-native-maps';
import {stylesText, theme} from '../../theme/theme';
import mapStyle from './mapStyle.json';
import Geolocation from '@react-native-community/geolocation';
import IconMap from './components/IconMap';
import {socket} from '../../services/socket';
import {useNavigation} from '@react-navigation/native';

interface Props extends LatLng {
  name: string;
}

const Maps: React.FC = () => {
  const navigate = useNavigation();
  const [userLocation, setUserLocation] = useState<LatLng>();
  const [busLocation, setBusLocation] = useState<Props[]>([]);
  const mapRef = useRef(null);

  useEffect(() => {
    getLocation();
    const interval = setInterval(() => {
      getLocation();
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  const getLocation = () => {
    Geolocation.getCurrentPosition(position => {
      if (position) {
        setUserLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      }
    });
  };

  useEffect(() => {
    socket.on('driverLocation', data => {
      // console.log(data);
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
        {busLocation.map(bus => (
          <Marker
            key={bus.name}
            coordinate={{
              latitude: bus.latitude,
              longitude: bus.longitude,
            }}
            style={styles.marker}>
            <IconMap
              name={bus.name}
              image="https://2019.onibus.org/3/30/p/17e90fe3e1011016ce06bd45a193643c.jpg"
            />
          </Marker>
        ))}

        {userLocation && (
          <Marker
            key={'user'}
            coordinate={{
              latitude: userLocation.latitude,
              longitude: userLocation.longitude,
            }}
            style={styles.marker}>
            <IconMap
              name="Você"
              image="https://static.vecteezy.com/system/resources/thumbnails/008/442/086/small/illustration-of-human-icon-user-symbol-icon-modern-design-on-blank-background-free-vector.jpg"
            />
          </Marker>
        )}
      </MapView>
      <TouchableOpacity
        onPress={() => navigate.navigate('Welcome')}
        style={styles.button}>
        <Text style={stylesText.textWhite}>Voltar</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Maps;

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
