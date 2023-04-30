import styled from "styled-components/native";

export const Container = styled.View`
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: 2;
  background-color: rgba(76, 76, 76, 1);
  display: flex;
  align-items: center;
`;

export const Wrapper = styled.View`
  width: 90%;
  max-width: 550px;
  padding: 32px 0;
`;

export const Notification = styled.View`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  padding: 10px;
  flex-direction: row;
  margin-top: 30px;
`;

export const Details = styled.View`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  .divisor {
    margin-top: 30px;
    margin-bottom: 10px;
  }
`;

export const Price = styled.Text`
  font-size: 35px;
  margin-top: 5px;
  color: white;
`;

export const Others = styled.Text`
  font-size: 25px;
  margin-top: 15px;
  color: white;
`;

export const Route = styled.View`
  width: 100%;
  max-width: 400px;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  flex-direction: column;
  padding-top: 20px;
  padding-bottom: 20px;
`;

export const RouteAddress = styled.View`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

export const RouteList = styled.View`
  padding-left: 15px;
`;

export const RouteItem = styled.Text`
  min-height: 35px;
  padding-top: 5px;
  padding-bottom: 5px;
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  font-size: 16px;
  color: white;
`;

export const RouteItem2 = styled.Text`
  min-height: 35px;
  padding-top: 5px;
  padding-bottom: 5px;
  display: flex;
  align-items: flex-end;
  justify-content: flex-start;
  font-size: 16px;
  color: white;
`;

export const Left = styled.View`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
`;

export const RouteWrapper = styled.View`
  max-height: 350px;
  overflow: hidden;
  overflow-y: auto;

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
