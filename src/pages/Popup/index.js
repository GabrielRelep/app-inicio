import { Image, Text } from "react-native";
import Alert from "../../assets/alert.png";
import PointedDivisor from "../../assets/pointedDivisor.png";
import Button from "../../components/Button";
import { Audio } from 'expo-av';
import { Ionicons } from '@expo/vector-icons';
import { Foundation } from '@expo/vector-icons';
import {
  Actions,
  ActionsRow,
  Container,
  ContentWrapper,
  Details,
  Left,
  Line2,
  Notification,
  NotificationWrapper,
  NotifyIcon,
  NotifyIconImage,
  Others,
  Price,
  ProfileData,
  ProfileImage,
  ProfileInfo,
  ProfileName,
  ProfileSince,
  RightHeaderItem,
  Route,
  RouteAddress,
  RouteHeader,
  RouteItem,
  RouteItem2,
  RouteList,
  RouteWrapper,
  Seats,
  TextDistance,
  Wrapper,
  PixImage,
  OtherText,
} from "./styles";
import { useEffect, useState } from "react";
import Profile from '../../assets/PassengerProfileImage2.jpg';
import Line1 from '../../assets/Line1.png';
import PixSRC from '../../assets/pix.png';

import * as Notifications from 'expo-notifications';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

const Popup = ({ trip, driverLat, driverLng, onAccept, onRefuse, }) => {
  const [distanceTo, setDistance] = useState('');
  const [timeTo, setTime] = useState('');

  const soundObject = new Audio.Sound();

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

  async function playSound() {
    try {
      await soundObject.loadAsync(require('../../../assets/popup.mp3'));
      await soundObject.playAsync();
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    playSound();
    sendNotification();

    return () => soundObject.stopAsync();
  }, []);

  function getCreatedDate(date) {
    const createdAt = new Date(date);
    return createdAt.toLocaleDateString('pt-BR');
  }

  const getPassengerCost = passengerId => {
    const data = trip.cost.costPerPassenger.find(
      passenger => passenger.passengerId === passengerId
    );

    return data.cost;
  };

  const fetchTimePassenger = (to, from) => {
    const url = `https://api.mapbox.com/directions/v5/mapbox/driving/${to.lng},${to.lat};${from.lng},${from.lat}?access_token=${process.env.REACT_APP_MAP_BOX_API_KEY}`;
    const [passengerTime, setPassengerTime] = useState('');
    const [passengerDistance, setPassengerDistance] = useState('');
    try {
      fetch(url)
        .then(response => response.json())
        .then(data => {
          const durationInSeconds = data.routes[0].duration;
          const durationInMinutes = (durationInSeconds / 60).toFixed(0);
          const durationInHours = (durationInMinutes / 60)
            .toFixed(2)
            .toString()
            .split('.');
          const parsedDurationInHours = 60 / (100 / Number(durationInHours[1]));
          setPassengerTime(
            durationInMinutes <= 59
              ? `${durationInMinutes}min`
              : `${durationInHours[0]}:${parsedDurationInHours.toFixed(0).length === 1
                ? `0${parsedDurationInHours.toFixed(0)}`
                : parsedDurationInHours.toFixed(0)
              }min`
          );

          const distanceInMeters = data.routes[0].distance;
          const distanceInKilometers = (distanceInMeters / 1000).toFixed(2);
          setPassengerDistance(
            distanceInMeters <= 999
              ? `${distanceInMeters}metros`
              : `${distanceInKilometers}kms`
          )
        })
        .catch(err => {
          console.log(err);
        });
    } catch {
      setTime('Aconteceu um erro');
    }
    return `${passengerTime} (${passengerDistance})`;
  };

  useEffect(() => {
    const waypoints = [];
    trip.passengers.map((passenger, index) => (
      index === 0 ? waypoints.push({ from: { lng: passenger.boardingAddress.longitude, lat: passenger.boardingAddress.latitude }, to: { lng: passenger.landingAddress.longitude, lat: passenger.landingAddress.latitude } }) : waypoints.push({ from: {}, to: { lng: passenger.landingAddress.longitude, lat: passenger.landingAddress.latitude } })
    ))

    const from = waypoints.map((waypoint, index) => (
      index === 0 ? { lng: waypoint.from.lng, lat: waypoint.from.lat } : ''
    ))
    const fromLocation = `${from[0].lng},${from[0].lat};`

    const to = waypoints.map((waypoint) => (
      waypoint.to
    ))
    const toPoints = to.map((point) => (
      `${point.lng}, ${point.lat};`
    ))
    const toLocation = toPoints.join(" ");

    const url = `https://api.mapbox.com/directions/v5/mapbox/driving/${fromLocation}${(toLocation.slice(0, toLocation.length - 1))}?access_token=${process.env.REACT_APP_MAP_BOX_API_KEY}`;

    try {
      fetch(url)
        .then(response => response.json())
        .then(data => {
          const durationInSeconds = data.routes[0].duration;
          const durationInMinutes = (durationInSeconds / 60).toFixed(0);
          const durationInHours = (durationInMinutes / 60)
            .toFixed(2)
            .toString()
            .split('.');
          const parsedDurationInHours = 60 / (100 / Number(durationInHours[1]));
          setTime(
            durationInMinutes <= 59
              ? `${durationInMinutes}min`
              : `${durationInHours[0]}:${parsedDurationInHours.toFixed(0).length === 1
                ? `0${parsedDurationInHours.toFixed(0)}`
                : parsedDurationInHours.toFixed(0)
              }min`
          );

          const distanceInMeters = data.routes[0].distance;
          const distanceInKilometers = (distanceInMeters / 1000).toFixed(2);
          setDistance(
            distanceInMeters <= 999
              ? `${distanceInMeters}metros`
              : `${distanceInKilometers}kms`
          )
        })
        .catch(err => {
          console.log(err);
        });
    } catch {
      setTime('Aconteceu um erro');
    }
  }, [])

  return (
    <Container>
      <Wrapper>
        <ContentWrapper>
          <Notification>
            <NotificationWrapper>
              <NotifyIcon>
                <NotifyIconImage source={Alert} />
              </NotifyIcon>
              <OtherText >Nova chamada</OtherText>
              <Seats>
                <OtherText >5</OtherText>
              </Seats>
            </NotificationWrapper>

            <Details>
              <Price>{trip.cost.total}</Price>
              <Others>R${(((parseFloat(((parseFloat(((trip.cost.total).slice(3)).replace(/,/gi, ".")))))) / parseFloat(distanceTo.slice(0, distanceTo.length - 3))).toFixed(2))} Por km rodado</Others>
              <Others>R${((parseFloat(((parseFloat(((trip.cost.total).slice(3)).replace(/,/gi, ".")))))) / parseFloat(timeTo.slice(0, timeTo.length - 3))).toFixed(2)} Por min rodado</Others>
            </Details>
            <Image source={Line1} />
          </Notification>

          <RouteWrapper>
            {trip.passengers.map((passenger) => (
              <Route>
                <RouteHeader>
                  <ProfileInfo>
                    <ProfileImage source={Profile} />
                    <ProfileData>
                      <ProfileName>
                        {passenger.passengerName}
                      </ProfileName>

                      <ProfileSince>
                        Desde: {getCreatedDate(passenger.createdAt)}
                      </ProfileSince>
                    </ProfileData>
                  </ProfileInfo>



                  {trip.paymentMethod === 1 && (
                    <RightHeaderItem>
                      <Ionicons name="cash-outline" size={24} color="green" />
                      <Text style={{ color: 'white' }}>Dinheiro</Text>
                    </RightHeaderItem>
                  )}
                  {trip.paymentMethod === 2 && (
                    <RightHeaderItem>
                      <PixImage source={PixSRC} />
                      <Text style={{ color: 'white' }}>Pix</Text>
                    </RightHeaderItem>
                  )}
                  {trip.paymentMethod === 3 && (
                    <RightHeaderItem>
                      <Foundation name="credit-card" size={24} color="black" />
                      <Text style={{ color: 'white' }}>Máquininha</Text>
                    </RightHeaderItem>
                  )}

                  {trip.hasReturn ? (
                    <RightHeaderItem>
                      <Ionicons name="arrow-undo-outline" size={25} color="white" />
                      <Text style={{ color: 'white' }}>Retorno</Text>
                    </RightHeaderItem>
                  ) : ('')}
                </RouteHeader>
                <TextDistance>
                  {getPassengerCost(passenger.passengerId)} - {fetchTimePassenger({ lng: passenger.boardingAddress.longitude, lat: passenger.boardingAddress.latitude }, { lng: driverLng, lat: driverLat })} - {fetchTimePassenger({ lng: passenger.boardingAddress.longitude, lat: passenger.boardingAddress.latitude }, { lng: passenger.landingAddress.longitude, lat: passenger.landingAddress.latitude })} </TextDistance>
                <RouteAddress>
                  <Left>
                    <Line2 source={PointedDivisor} />
                    <RouteList>
                      <RouteItem>{passenger.boardingAddress.name}</RouteItem>
                      <RouteItem2>{passenger.landingAddress.name}</RouteItem2>
                    </RouteList>
                  </Left>
                </RouteAddress>
              </Route>
            ))}
          </RouteWrapper>
        </ContentWrapper>

        <Actions>
          <ActionsRow>
            <Button
              label="Aceitar"
              color="#23f100"
              style={{ marginTop: 30, marginRight: 20 }}
              onPress={onAccept}
            />
            <Button
              label="Recusar"
              color="#fb2505"
              style={{ marginTop: 30, marginLeft: 20 }}
              onPress={onRefuse}
            />
          </ActionsRow>
        </Actions>
      </Wrapper>
    </Container >
  );
};

export default Popup;
