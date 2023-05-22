import styled from "styled-components/native";

export const Container = styled.TouchableOpacity`
  background-color: ${(props) => props.color};
  width: 50%;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  opacity: ${({ disabled }) => disabled ? 0.6 : 1};
`;
export const Label = styled.Text`
  color: white;
  font-family: "Comfortaa_700Bold";
`;
