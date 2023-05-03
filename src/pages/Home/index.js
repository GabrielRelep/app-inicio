import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Location from "expo-location";
import React, { useContext, useEffect, useState } from "react";
import { Switch, Text, View, Alert } from "react-native";
import branco from "../../assets/branco.png";
import verde from "../../assets/verde.png";
import Button from "../../components/Button";
import AuthContext from "../../contexts/auth";
import Popup from "../Popup";
import { Container, Imagem, Title } from "./styles";
import { io } from 'socket.io-client';
import { Audio } from 'expo-av';
import * as BackgroundFetch from 'expo-background-fetch';
import * as taskManager from 'expo-task-manager';
import * as Notifications from 'expo-notifications';


const TASK_NAME = "MY_TASK";

async function sendNotification() {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: 'Nova chamada recebida',
      body: 'Abra o aplicativo para continuar',
      vibrate: 1,
      sound: true,
    },
    trigger: {
      seconds: 2,
    }
  })
}

taskManager.defineTask(TASK_NAME, async () => {
  const soundObject = new Audio.Sound();
  async function playSound() {
    try {
      await soundObject.loadAsync(require('../../../assets/popup.mp3'));
      await soundObject.playAsync();
    } catch (error) {
      console.log(error);
    }
  }
  const accessToken = await AsyncStorage.getItem("accessToken");

  socket = io(`https://chevette.herokuapp.com/drivers`, {
    auth: {
      accessToken,
    },
    transports: ['websocket'],
  });

  socket.on('connect', async () => {
    try {
      if (socket.connected) console.log("Conectado");
      else console.log("Desconectado");
    } catch (error) {
      console.log(error)
    }
  });

  socket.on('receive-trip', data => {
    sendNotification();
    playSound();
  });
  try {
    const receivedNewData = "my task oi: " + Math.random();
    return receivedNewData ? BackgroundFetch.BackgroundFetchResult.NewData : BackgroundFetch.BackgroundFetchResult.NoData
  } catch (error) {
    return BackgroundFetch.BackgroundFetchResult.Failed;
  }
})

const register = () => {
  return BackgroundFetch.registerTaskAsync(TASK_NAME, {
    minimumInterval: 1,
    stopOnTerminate: false,
  })
}

const unregister = () => {
  return BackgroundFetch.unregisterTaskAsync(TASK_NAME)
}
function registerMyTask() {
  register().then(() => console.log("task registered")).catch(error => console.log(error));
}

function unregisterMyTask() {
  unregister().then(() => console.log("task unregistered")).catch(error => console.log(error));;
}



Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});


const Home = () => {
  const [driverLat, setDriverLat] = useState('');
  const [driverLng, setDriverLng] = useState('');
  const { setUser } = useContext(AuthContext);
  const [popup, setPopup] = useState(false);
  const [popupData, setPopupData] = useState({});
  const [locationPermited, setLocationPermited] = useState(true);
  const [isEnabled, setIsEnabled] = useState(false);
  const [accessToken, setAccessToken] = useState('');
  const [isConnected, setIsConnected] = useState(false);
  const [taskRegistered, setTaskRegistered] = useState(false);
  let socket;

  socket = io(`https://chevette.herokuapp.com/drivers`, {
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
      console.log(error)
    }
  });

  if (isEnabled && isConnected) {
    socket.on('receive-trip', data => {
      setPopupData(data);
      setPopup(true);

      setTimeout(() => {
        setPopup(false);
      }, 30 * 1000);
    });
  }

  socket.on('connect_error', err => {
    console.log('Error on Socket Connection', err);
  });

  socket.on('connect_failed', err => {
    console.log('Socket Connection Failed', err);
  });

  socket.on('disconnect', err => {
    console.log('Socket Disconnected', err);
  });

  function acceptTrip(id) {
    setPopup(false);
    socket.emit('accept-trip', { id });
  }

  function refuseTrip(id) {
    setPopup(false);
    socket.emit('refuse-trip', { id });
  }

  async function getAccessToken() {
    const accessToken = await AsyncStorage.getItem("accessToken");
    if (!accessToken) {
      Alert.alert("Faça o login novamente")
    }
    setAccessToken(accessToken);
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
    let { status } = await Location.requestForegroundPermissionsAsync();

    if (status !== "granted") {
      setLocationPermited(false);
      return;
    }

    setLocationPermited(true);
  }

  async function playSound() {
    const { status } = await Audio.getPermissionsAsync();
    if (status !== "granted") {
      await Audio.requestPermissionsAsync();
    }
  }

  useEffect(() => {
    requestPermition();
    getAccessToken();
    loadLocation();
  }, []);

  const handleLeave = () => {
    async function removeUser() {
      await AsyncStorage.removeItem("@user");
      setUser(null);
    }

    removeUser();
  };

  return (
    <>
      {popup && <Popup
        trip={popupData}
        driverLng={driverLng}
        driverLat={driverLat}
        onAccept={() => acceptTrip(popupData.id)}
        onRefuse={() => refuseTrip(popupData.id)}
      />}
      <Container>
        {locationPermited ? (
          <>
            <View style={{ flexDirection: "row" }}>
              <Title>Off</Title>
              <Switch
                trackColor={{ false: "#767577", true: "#4D4D4D" }}
                thumbColor={isEnabled ? "#22F100" : "#f4f3f4"}
                ios_backgroundColor="#3e3e3e"
                onValueChange={() => {
                  playSound();
                  setIsEnabled(!isEnabled)
                  if (taskRegistered) {
                    unregisterMyTask();
                    setTaskRegistered(false);
                  }
                  else if (!taskRegistered) {
                    registerMyTask();
                    setTaskRegistered(true);
                  }
                }}
                value={isEnabled}
                style={{ marginBottom: 140 }}
              />
              <Title>On</Title>
            </View>
            {isEnabled ? <Imagem source={verde} /> : <Imagem source={branco} />}
          </>
        ) : (
          <View style={{ flexDirection: "row" }}>
            <Text>
              Você precisa autorizar a localização no app.
            </Text>
          </View>
        )}

        <Button
          label="Sair"
          color={"#944BBB"}
          style={locationPermited ? { marginTop: 150 } : { marginTop: 30 }}
          onPress={() => {
            handleLeave();
            // unregisterMyTask();
          }}
        />
      </Container>
    </>
  );
};

export default Home;