import React,{useState} from 'react';
import { Text, View,Switch } from 'react-native';


 import { Container,Imagem,Title } from './styles';
import branco from '../../assets/branco.png'
import verde from '../../assets/verde.png'
import Button from '../../components/Button';

const Home = () => {
  const [isEnabled, setIsEnabled] = useState(false);

  function loadingFake(){
    setTimeout(()=>console.log('teste') ,1000)
    setIsEnabled(!isEnabled)

   
    
  }
  return(
    <Container>
    <View style={{flexDirection:'row'}}>
      <Title>Off</Title>
      <Switch
      trackColor={{ false: "#767577", true: "#4D4D4D" }}
      thumbColor={isEnabled ? "#22F100" : "#f4f3f4"}
      ios_backgroundColor="#3e3e3e"
      onValueChange={()=>loadingFake()}
      value={isEnabled}
      style={{marginBottom:140}}
      
    />
    <Title>On</Title>

    </View>
    {isEnabled?(<Imagem source={verde} />):(<Imagem source={branco} />)}
    
<Button label="Sair" color={"#944BBB"} style={{marginTop:150}}/>
    
    </Container>
  )
}

export default Home;