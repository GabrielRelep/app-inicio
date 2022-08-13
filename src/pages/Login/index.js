
import { StyleSheet, Text, View } from 'react-native';
import Button from '../../components/Button';
import {Container,Title,Inputs} from './styles'
import { Feather } from '@expo/vector-icons';
function Login(){
  return(
    <Container>
    <View style={{flexDirection:'row'}}>
    <Feather name="bell" size={43} style={{marginRight:10}} color="black" />
      <Title>Alert-pro</Title>
    </View>
      
      <Inputs placeholderTextColor="white" placeholder="Digite seu telefone"/>
      <Inputs placeholderTextColor="white" placeholder="Sua Senha "/>
      <Button label="Entrar"/>
    </Container>
  )
}

export default Login;