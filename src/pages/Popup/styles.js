import styled from "styled-components/native";

export const Container = styled.View`
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: 2;
  background-color: rgba(76, 76, 76, 1);
  display: flex;
  align-items: center;
`

export const NotificationWrapper = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  justify-content: space-between;
  margin-bottom: 24px;
`

export const OtherText = styled.Text`
  color: white;
  font-size: 25px;
`

export const Wrapper = styled.View`
  width: 90%;
  max-width: 550px;
  padding: 32px 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
`;

export const ContentWrapper = styled.View`

`

export const Notification = styled.View`
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  margin-bottom: 30px;
`;

export const Details = styled.View`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding-bottom: 28px;
`;

export const Price = styled.Text`
  font-size: 35px;
  color: white;
  margin-bottom: 25px;
`;

export const Others = styled.Text`
  font-size: 25px;
  color: white;
`;

export const Route = styled.View`
  width: 100%;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  flex-direction: column;
`;

export const RouteAddress = styled.View`
  display: flex;
  width: 100%;
`;

export const RouteList = styled.View`
  display: flex;
  width: 100%;
  padding-left: 8px;
`;

export const RouteItem = styled.Text`
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  font-size: 16px;
  color: white;
`;

export const Line2 = styled.Image`
  height: 36px;
  width: 5px;
`

export const RouteItem2 = styled.Text`
  min-height: 35px;
  padding-top: 5px;
  display: flex;
  align-items: flex-end;
  justify-content: flex-start;
  font-size: 16px;
  color: white;
`;

export const RouteHeader = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-content: center;
  width: 100%;
  max-height: 50px;
  margin-bottom: 10px;
`

export const ProfileImage = styled.Image`
  width: 50px;
  height: 50px;
  border-radius: 999px;
  margin-bottom: 10px;
`

export const ProfileInfo = styled.View`
  display: flex;
  flex-direction: row;
  align-content: center;
`

export const ProfileData = styled.View`
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: center;
  margin-left: 10px;
`
export const ProfileName = styled.Text`
  font-size: 18px;
  color: white;
`
export const ProfileSince = styled.Text`
  font-size: 12px;
  color: white;
`

export const RightHeaderItem = styled.View`
  display: flex;
  flex-direction: column;
  height: 100%;
  align-items: center;
  justify-content: center;
`

export const TextDistance = styled.Text`
  font-size: 20px;
  color: white;
  margin-bottom:10px;
`


export const Left = styled.View`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  width: 100%;
  padding-left: 4px;
`;

export const RouteWrapper = styled.View`
  max-height: 350px;
  overflow: hidden;
  overflow-y: auto;
  max-width: 100%;
  display: flex;

  &::-webkit-scrollbar {
    width: 8px;
    height: 50px;
    background: #cecece50;
    border-radius: 999px;
  }

  &::-webkit-scrollbar-thumb {
    background: #fff;
    border-radius: 999px;
  }
`;

export const NotifyIcon = styled.View`
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const PixImage = styled.Image`
  height: 25px;
  width: 25px;
`

export const NotifyIconImage = styled.Image``;

export const Seats = styled.View`
  font-size: 26px;
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 40px;
  border: 2px solid white;
`;

export const Actions = styled.View`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

export const ActionsRow = styled.View`
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-direction: row;
  padding: 10px;
  width: 100%;
  max-width: 300px;
`;
