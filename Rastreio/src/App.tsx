import React, {useEffect, useState} from 'react';
import {SafeAreaView, StatusBar, StyleSheet} from 'react-native';
import Welcome from './pages/Welcome/Welcome';
import Maps from './pages/Maps/Maps';
import {socket} from './services/socket';
import {handleStatusPermissions} from './utils/permissions';

const App = (): JSX.Element => {
  const [activeMap, setActiveMap] = useState(false);

  useEffect(() => {
    handleStatusPermissions();
    socket.on('connect', () => {
      console.log('Conectado ao servidor WebSocket');
    });

    return () => {
      socket.disconnect();
    };
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="default" backgroundColor="#000" />

      {!activeMap ? (
        <Welcome onPress={() => setActiveMap(!activeMap)} />
      ) : (
        <Maps setReturn={() => setActiveMap(!activeMap)} />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#000',
  },
});

export default App;
