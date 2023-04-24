import { Image, Text } from "react-native";
import Alert from "../../assets/alert.png";
import PointedDivisor from "../../assets/pointedDivisor.png";
import Button from "../../components/Button";
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

const Popup = () => {
  return (
    <Container>
      <Wrapper>
        <Notification>
          <NotifyIcon>
            <NotifyIconImage source={Alert} />
          </NotifyIcon>
          <Text style={{ color: "white", fontSize: "22px" }}>Nova chamada</Text>
          <Seats>
            <Text style={{ color: "white", fontSize: "22px" }}>4</Text>
          </Seats>
        </Notification>

        <Details>
          <Price>R$10</Price>
          <Others>10kms - 10</Others>

          <RouteWrapper>
            <Route>
              <RouteAddress>
                <Left>
                  <Image source={PointedDivisor} style={{ height: 60 }} />
                  <RouteList>
                    <RouteItem>trip.route.boardingDistrict</RouteItem>
                    <RouteItem2>trip.route.landingDistrict</RouteItem2>
                  </RouteList>
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
