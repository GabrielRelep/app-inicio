import MaskInput from "react-native-mask-input";
import styled from "styled-components/native";

export const Container = styled.SafeAreaView`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const Imagem = styled.Image`
  width: 350px;
  height: 200px;
`;

export const Title = styled.Text`
  font-weight: 400;
  font-size: 40px;
  line-height: 45px;
  text-align: center;
  font-family: "Comfortaa_400Regular";
  color: #4d4d4d;
  margin-bottom: 60px;
`;

export const FieldInput = styled.TextInput`
  width: 80%;
  height: 60px;
  background: #4d4d4d;
  border-radius: 8px;
  color: white;
  padding-left: 20px;
  font-family: "Comfortaa_400Regular";
`;

export const AppIdFieldInput = styled.TextInput`
  width: 80%;
  height: 60px;
  background: #fff;
  border-radius: 8px;
  color: white;
  padding-left: 20px;
  color: #4d4d4d;
  font-family: "Comfortaa_400Regular";
  border: 1px solid #4d4d4d;
`;

export const FieldMaskedInput = styled(MaskInput)`
  width: 80%;
  height: 60px;
  background: #4d4d4d;
  border-radius: 8px;
  color: white;
  padding-left: 20px;
  font-family: "Comfortaa_400Regular";
`;
