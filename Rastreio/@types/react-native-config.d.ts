declare module 'react-native-config' {
  interface Config {
    GOOGLE_MAPS_API_KEY: string;
    SERVER_HOST: string;
    // Adicione outras variáveis de ambiente aqui
  }

  const Config: Config;
  export default Config;
}
