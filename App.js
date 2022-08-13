import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Login from './src/pages/Login';
import { useFonts, Comfortaa_400Regular,Comfortaa_700Bold } from '@expo-google-fonts/comfortaa';
import Home from './src/pages/Home';
import Trips from './src/pages/Trips';


export default function App() {
  const [loaded] = useFonts({
    Comfortaa_400Regular,
    Comfortaa_700Bold
  });
  if (!loaded) {
    return null;
  }
  return (
    <Home/>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
