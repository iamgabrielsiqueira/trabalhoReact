import axios from 'axios';
import React, {Component} from 'react';
import { LinearGradient, Font } from 'expo';
import {StyleSheet, Text, View, Image, TouchableOpacity, AlertIOS} from 'react-native';
import * as Animatable from 'react-native-animatable';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class Enigma1 extends Component {

  constructor(props) {
    super(props);

    this.state = {
    	fontLoaded: false,
      carregando : false,
      dados: [],
      error: false,
      carregado: false,
    };
  }

  async componentDidMount() {
    await Font.loadAsync({
      'raleway-semibold': require('./../assets/fonts/Raleway-Black.ttf'),
    });

    this.setState({ 
      fontLoaded: true,
      carregando: true 
    });

    const url = 'http://gileduardo.com.br/react/api_charadas/rest.php/charadas';

    setTimeout(() => {
      axios.get(url).then(response => {
        this.setState({
          dados : response.data,
          carregando : false,
          carregado : true,
        });
      }).catch(error => {
          this.setState({
            carregando : false,
            error : true,
            carregado : false
          });
        });
    }, 1000);
  }

  onPress(val) {
    switch(val) {
      case 1:
        AlertIOS.alert(
         'Errou',
         'Resposta errada!'
        );
      break;
      case 2:
        AlertIOS.alert(
         'Errou',
         'Resposta errada!'
        );
      break;
      case 3:
        AlertIOS.alert(
         'Parabéns',
         'Resposta correta!'
        );
      break;
    }
  }

  render() {
    return (
      <LinearGradient colors={['#CAD3C8', '#F8EFBA']} style={styles.container}>
        {
          this.state.fontLoaded ? (
            <LinearGradient colors={['#182C61', '#3B3B98']} style={styles.enigma}>
              <Animatable.View animation="zoomIn" iterationCount={1} style={styles.enigma}>
                <Text style={styles.pergunta}>
                Um taco e uma bola de baseball custam juntos R$1.10. 
                O taco custa um dólar a mais que a bola. Quanto custa a bola?
                </Text>
              </Animatable.View>
            </LinearGradient>
          ) : null
        }
        {
          this.state.carregado ? (
            <Animatable.View animation="zoomIn" iterationCount={1} 
              style={{marginTop: 10, justifyContent: 'center', alignItems: 'center'}}>
              <TouchableOpacity style={styles.botaoResponder} onPress={ () => { this.onPress(1) } }>
                <Text h5 style={styles.tituloResposta}> R${this.state.dados[0].resp_a} </Text>
              </TouchableOpacity>
            </Animatable.View>
          ) : null
        }
        {
          this.state.carregado ? (
            <Animatable.View animation="zoomIn" iterationCount={1} 
              style={{marginTop: 10, justifyContent: 'center', alignItems: 'center'}}>
              <TouchableOpacity style={styles.botaoResponder} onPress={ () => { this.onPress(2) } }>
                <Text h5 style={styles.tituloResposta}> R${this.state.dados[0].resp_b} </Text>
              </TouchableOpacity>
            </Animatable.View>
          ) : null
        }
        {
          this.state.carregado ? (
            <Animatable.View animation="zoomIn" iterationCount={1} 
              style={{marginTop: 10, justifyContent: 'center', alignItems: 'center'}}>
              <TouchableOpacity style={styles.botaoResponder} onPress={ () => { this.onPress(3) } }>
                <Text h5 style={styles.tituloResposta}> R${this.state.dados[0].resp_c} </Text>
              </TouchableOpacity>
            </Animatable.View>
          ) : null
        }
      </LinearGradient>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  enigma: {
    width: 270, 
    height: 200, 
    borderRadius: 20,
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pergunta: {
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    padding: 15,
    fontFamily: 'raleway-semibold',
  },
  imagem: {
    width: 270,
    height: 200,
    borderRadius: 20,
  },
  tituloResposta: {
    textAlign: 'center',
    color: '#3B3B98',
  },
  botaoResponder: {
    borderRadius: 20,
    borderColor: '#3B3B98',
    backgroundColor: 'transparent',
    borderWidth: 1,
    height: 40,
    width: 200,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
