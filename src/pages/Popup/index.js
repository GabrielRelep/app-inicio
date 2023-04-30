import { Image, Text } from "react-native";
import Alert from "../../assets/alert.png";
import PointedDivisor from "../../assets/pointedDivisor.png";
import Button from "../../components/Button";
import { Audio } from 'expo-av';
import {
  Actions,
  ActionsRow,
  Container,
  Details,
  Left,
  Notification,
  NotifyIcon,
  NotifyIconImage,
  Others,
  Price,
  Route,
  RouteAddress,
  RouteItem,
  RouteItem2,
  RouteList,
  RouteWrapper,
  Seats,
  Wrapper,
} from "./styles";
import { useEffect } from "react";

const Popup = ({ trip }) => {
  useEffect(() => {
    async function playSound() {
      const soundObject = new Audio.Sound();
      try {
        await soundObject.loadAsync(require('../../../assets/popup.mp3'));
        await soundObject.playAsync();
      } catch (error) {
        console.log(error);
      }
    }
    playSound();
  }, []);

  return (
    <Container>
      <Wrapper>
        <Notification>
          <NotifyIcon>
            <NotifyIconImage source={Alert} />
          </NotifyIcon>
          <Text style={{ color: "white" }}>Nova chamada</Text>
          <Seats>
            <Text style={{ color: "white" }}>{trip.seats}</Text>
          </Seats>
        </Notification>

        <Details>
          <Price>{trip.cost.total}</Price>
          <Others>10kms - 10</Others>

          <RouteWrapper>
            <Route>
              <RouteAddress>
                <Left>
                  {trip.passengers.map((passenger) => (
                    <>
                      <Image source={PointedDivisor} style={{ height: 60 }} />
                      <RouteList>
                        <RouteItem>{passenger.boardingAddress.name}</RouteItem>
                        <RouteItem2>{passenger.landingAddress.name}</RouteItem2>
                      </RouteList>
                    </>
                  ))}
                </Left>
              </RouteAddress>
            </Route>
          </RouteWrapper>
        </Details>

        <Actions>
          <ActionsRow>
            <Button
              label="Aceitar"
              color="#23f100"
              style={{ marginTop: 30, marginRight: 20 }}
            />
            <Button
              label="Recusar"
              color="#fb2505"
              style={{ marginTop: 30, marginLeft: 20 }}
            />
          </ActionsRow>
        </Actions>
      </Wrapper>
    </Container>
  );
};

export default Popup;
