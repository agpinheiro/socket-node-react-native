import io from 'socket.io-client';
import Config from 'react-native-config';
export const socket = io(Config.SERVER_HOST);
