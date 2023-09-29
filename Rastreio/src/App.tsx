import React, {useEffect} from 'react';
import {SafeAreaView, StatusBar, StyleSheet} from 'react-native';
import {socket} from './services/socket';
import {handleStatusPermissions} from './utils/permissions';
import Routes from './routes/routes';
import { theme } from './theme/theme';

const App = (): JSX.Element => {
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
      <Routes />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    color: '#000',
  },
});

export default App;
