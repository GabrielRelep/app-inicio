import AsyncStorage from '@react-native-async-storage/async-storage';
import { Audio } from 'expo-av';
import * as Location from 'expo-location';
import * as WebBrowser from 'expo-web-browser';
import React, { useContext, useEffect, useState } from 'react';
import { Switch, Text, View, Alert } from 'react-native';
import { io } from 'socket.io-client';

import { registerMyTask, unregisterMyTask } from './receive-trip-background';
import { Container, Imagem, Title } from './styles';
import { registerUpdateDriverLocationTask } from './update-location-background';
import branco from '../../assets/branco.png';
import verde from '../../assets/verde.png';
import Button from '../../components/Button';
import AuthContext from '../../contexts/auth';
import { getAppInfo } from '../../services';
import Popup from '../Popup';

function Home() {
  const [driverLat, setDriverLat] = useState('');
  const [driverLng, setDriverLng] = useState('');
  const { setUser, user } = useContext(AuthContext);
  const [popup, setPopup] = useState(false);
  const [popupData, setPopupData] = useState({});
  const [locationPermited, setLocationPermited] = useState(true);
  const [isEnabled, setIsEnabled] = useState(false);
  const [accessToken, setAccessToken] = useState('');
  const [isConnected, setIsConnected] = useState(false);
  const [taskRegistered, setTaskRegistered] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isOnTrip, setIsOnTrip] = useState(false);

  const socket = io(`https://chevette.herokuapp.com/drivers`, {
    auth: {
      accessToken,
    },
    transports: ['websocket'],
  });

  socket.on('connect', async () => {
    try {
      if (socket.connected) setIsConnected(true);
      else setIsConnected(false);
    } catch (error) {
      console.log(error);
    }
  });

  if (isEnabled && isConnected && !popup) {
    socket.on('receive-trip', (data) => {
      setPopupData(data);
      setPopup(true);

      setTimeout(() => {
        setIsEnabled(true);
        setPopup(false);
      }, 30 * 1000);
    });
  }

  socket.on('connect_error', (err) => {
    console.log('Error on Socket Connection', err);
  });

  socket.on('connect_failed', (err) => {
    console.log('Socket Connection Failed', err);
  });

  socket.on('disconnect', (err) => {
    console.log('Socket Disconnected', err);
  });

  // socket.on('in-trip', (data) => {
  //   if (data) setIsOnTrip(true);
  // });

  async function acceptTrip(id) {
    setLoading(true);
    const appId = await AsyncStorage.getItem('@appId');
    const { domain } = await getAppInfo(appId);
    await WebBrowser.openBrowserAsync(`http://weptek.app/${domain}`);
    socket.emit('accept-trip', { id });
    setLoading(false);
    setPopup(false);
  }

  function refuseTrip(id) {
    setPopup(false);
    socket.emit('refuse-trip', { id });
  }

  async function getAccessToken() {
    const token = await AsyncStorage.getItem('accessToken');
    if (!token) {
      Alert.alert('Faça o login novamente');
    }
    setAccessToken(token);
  }

  async function loadLocation() {
    await Location.watchPositionAsync(
      {
        accuracy: Location.Accuracy.BestForNavigation,
        distanceInterval: 1,
      },
      (userLoc) => {
        setDriverLat(userLoc.coords.latitude);
        setDriverLng(userLoc.coords.longitude);
      }
    );
  }

  async function requestPermition() {
    const { status: foregroundStatus } = await Location.requestForegroundPermissionsAsync();

    if (foregroundStatus === 'granted') {
      const { status: backgroundStatus } = await Location.requestBackgroundPermissionsAsync();
      if (backgroundStatus === 'granted') {
        setLocationPermited(true);
      } else {
        setLocationPermited(false);
      }
    } else {
      setLocationPermited(false);
    }
  }

  async function playSound() {
    const { status } = await Audio.getPermissionsAsync();
    if (status !== 'granted') {
      await Audio.requestPermissionsAsync();
    }
  }

  const handleLeave = () => {
    async function removeUser() {
      await AsyncStorage.removeItem('@user');
      setUser(null);
    }

    removeUser();
  };

  const handleSwitchChange = () => {
    playSound();
    setIsEnabled((enabled) => !enabled);
    if (taskRegistered) {
      unregisterMyTask();
      setTaskRegistered(false);
    } else if (!taskRegistered) {
      registerMyTask();
      setTaskRegistered(true);
    }
  };

  useEffect(() => {
    requestPermition();
    getAccessToken();
    loadLocation();
    registerUpdateDriverLocationTask();
  }, []);

  // useEffect(() => {
  //   registerUpdateDriverLocationTask()
  // }, [isOnTrip])

  return (
    <>
      {popup && (
        <Popup
          trip={popupData}
          driverLng={driverLng}
          driverLat={driverLat}
          onAccept={() => acceptTrip(popupData.id)}
          onRefuse={() => refuseTrip(popupData.id)}
        />
      )}
      <Container>
        {locationPermited ? (
          <>
            <View style={{ flexDirection: 'row' }}>
              <Title>Off</Title>
              <Switch
                trackColor={{ false: '#767577', true: '#4D4D4D' }}
                thumbColor={isEnabled ? '#22F100' : '#f4f3f4'}
                ios_backgroundColor="#3e3e3e"
                onValueChange={handleSwitchChange}
                value={isEnabled}
                style={{ marginBottom: 140 }}
              />
              <Title>On</Title>
            </View>
            {isEnabled ? <Imagem source={verde} /> : <Imagem source={branco} />}
          </>
        ) : (
          <View style={{ flexDirection: 'row' }}>
            <Text>Você precisa autorizar a localização no app.</Text>
          </View>
        )}

        <Button
          isLoading={loading}
          label="Sair"
          color="#944BBB"
          style={locationPermited ? { marginTop: 150 } : { marginTop: 30 }}
          onPress={() => {
            handleLeave();
          }}
        />
      </Container>
    </>
  );
}

export default Home;
