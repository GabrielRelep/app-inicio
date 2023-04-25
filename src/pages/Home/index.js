import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Location from "expo-location";
import React, { useContext, useEffect, useState } from "react";
import { Switch, Text, View } from "react-native";
import branco from "../../assets/branco.png";
import verde from "../../assets/verde.png";
import Button from "../../components/Button";
import AuthContext from "../../contexts/auth";
import PopupContext from "../../contexts/popup";
import Popup from "../Popup";
import { Container, Imagem, Title } from "./styles";

const Home = () => {
  const { setUser } = useContext(AuthContext);
  const { popup } = useContext(PopupContext);
  console.log(popup);
  const [locationPermited, setLocationPermited] = useState(true);
  const [isEnabled, setIsEnabled] = useState(false);

  async function loadLocation() {
    await Location.watchPositionAsync(
      {
        accuracy: Location.Accuracy.BestForNavigation,
        distanceInterval: 1,
      },
      (userLoc) => {
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

  useEffect(() => {
    requestPermition();
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
      {popup && <Popup />}
      <Container>
        {locationPermited ? (
          <>
            <View style={{ flexDirection: "row" }}>
              <Title>Off</Title>
              <Switch
                trackColor={{ false: "#767577", true: "#4D4D4D" }}
                thumbColor={isEnabled ? "#22F100" : "#f4f3f4"}
                ios_backgroundColor="#3e3e3e"
                onValueChange={() => setIsEnabled(!isEnabled)}
                value={isEnabled}
                style={{ marginBottom: 140 }}
              />
              <Title>On</Title>
            </View>
            {isEnabled ? <Imagem source={verde} /> : <Imagem source={branco} />}
          </>
        ) : (
          <View style={{ flexDirection: "row" }}>
            <Text style={{ fontSize: 16 }}>
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
