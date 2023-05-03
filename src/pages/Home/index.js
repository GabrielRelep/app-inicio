import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Location from "expo-location";
import React, { useContext, useEffect, useState } from "react";
import { Switch, Text, View } from "react-native";
import branco from "../../assets/branco.png";
import verde from "../../assets/verde.png";
import Button from "../../components/Button";
import AuthContext from "../../contexts/auth";
import Popup from "../Popup";
import { Container, Imagem, Title } from "./styles";
import { io } from 'socket.io-client';
import { Audio } from 'expo-av';

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
  let socket;

  socket = io(`https://chevette.herokuapp.com/drivers`, {
    auth: {
      accessToken,
    },
    transports: ['websocket'],
  });
  console.log({ isConnected });

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
    console.log("aceitou")
    setPopup(false);
    socket.emit('accept-trip', { id });
  }

  function refuseTrip(id) {
    console.log("recusou")
    setPopup(false);
    socket.emit('refuse-trip', { id });
  }

  async function getAccessToken() {
    const accessToken = await AsyncStorage.getItem("accessToken");
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
        //Retorna latitude e logitude dentro da variável "userLoc"
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
    console.log(status);
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
          onPress={handleLeave}
        />
      </Container>
    </>
  );
};

export default Home;
