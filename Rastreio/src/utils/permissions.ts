import {
  checkMultiple,
  requestMultiple,
  PERMISSIONS,
} from 'react-native-permissions';

const checkPermissions = async () => {
  try {
    const status = await checkMultiple([
      PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
      PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION,
      PERMISSIONS.ANDROID.ACCESS_BACKGROUND_LOCATION,
    ]);
    // console.log(status);
    return status;
  } catch (error) {
    console.error('Erro ao verificar permissões:', error);
  }
};

export const handleStatusPermissions = async () => {
  const status = await checkPermissions();
  if (status?.['android.permission.ACCESS_BACKGROUND_LOCATION'] !== 'granted') {
    await requestMultiple([
      PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
      PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION,
      PERMISSIONS.ANDROID.ACCESS_BACKGROUND_LOCATION,
    ]).then(result => {
      // console.log('Background', result);
    });
  }
};
