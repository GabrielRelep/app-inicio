import React from 'react';
import { View } from 'react-native';
import { Container,Notificatoins,Header,Title,PriceDiv,Price,RuaText } from './styles';
import { Feather } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import Button from '../../components/Button'
const Trips = () => {
  return(
    <Container>
      <Header>
      <Feather name="bell" size={43} style={{marginRight:10}} color="white" />
      <Title>Nova viagem</Title>
      <View style={{borderWidth:2,borderColor:'white',borderRadius:'60',width:50,alignContent:'center',justifyContent:'center',marginLeft:15}}>
        <Notificatoins>5</Notificatoins>

      </View>
      </Header>

      <PriceDiv>
        <Price>R$34,00</Price>
        <Price>23km</Price>
      </PriceDiv>
      <View style={{marginTop:160}}/>

      <RuaText>
      Rua pedro paulo de jesus, 45
      </RuaText>
      <AntDesign name="arrowdown" style={{marginTop:45,marginBottom:45}} size={40} color="white" />
      <RuaText>
      Rua pedro paulo de jesus, 45
      </RuaText>

      <View style={{width:'90%', flexDirection:'row',marginTop:50}}>
        <Button label={'Aceitar'} style={{marginLeft:-10}} color='#22F100' />
        <Button label={'Recusar'} style={{marginLeft:15}} color="#FF0000"/>

      </View>

    </Container>
  )
}

export default Trips;