import styled from 'styled-components/native';

export const Container = styled.TouchableOpacity`
  background-color: ${props => props.color};
  width: 50%;
  height: 50px;
  justify-content: center;
  align-items: center;
  border-radius: 8;
`;
export const Label = styled.Text`
  color: white;
  font-family: 'Comfortaa_700Bold';
`;