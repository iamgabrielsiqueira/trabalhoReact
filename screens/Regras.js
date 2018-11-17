import axios from 'axios';
import React, {Component} from 'react';
import { LinearGradient, Font } from 'expo';
import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import * as Animatable from 'react-native-animatable';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class Regras extends Component {

  constructor(props) {
    super(props);

    this.state = {
    	fontLoaded: false,
    };
  }

  titleize(text) {
    var words = text.toLowerCase().split(" ");

    for (var a = 0; a < words.length; a++) {
        var w = words[a];
        words[a] = w[0].toUpperCase() + w.slice(1);
    }

    return words.join(" ");
	}

  async componentDidMount() {
    await Font.loadAsync({
      'raleway-light': require('./../assets/fonts/Raleway-Regular.ttf'),
      'raleway-medium': require('./../assets/fonts/Raleway-Medium.ttf'),
    });

    this.setState({ 
      fontLoaded: true 
    });
  }

  onPress(val) {
    switch(val) {
      case 1:
        console.log("iniciar");
        this.props.navigation.navigate('Enigma1');
      break;
      case 2:
        console.log("voltar");
        this.props.navigation.navigate('Main');
      break;
    }
  }

  render() {
    const { dados } = this.props.navigation.state.params;

    var nome = this.titleize(dados.nome);
    var divisao = nome.split(" ");
    var primeiroNome = divisao[0];

    return (
      <LinearGradient colors={['#F8EFBA', '#fe8b8a']} style={styles.container}>
      	{
          this.state.fontLoaded ? (
            <Animatable.Text animation="zoomIn" iterationCount={1} style={styles.titulo}>
            	Bem vindo, { primeiroNome }.
            </Animatable.Text>
          ) : null
        }
        {
          this.state.fontLoaded ? (
            <Animatable.Text animation="zoomIn" iterationCount={1} style={styles.regras}>
            	Atenção! O jogo é constituido de 4{"\n"}enigmas sendo possível responder{"\n"}somente cada pergunta uma única vez.
            </Animatable.Text>
          ) : null
        }
        <Animatable.View animation="zoomIn" iterationCount={1} 
        	style={{marginTop: 40, justifyContent: 'center', alignItems: 'center'}}>
          <TouchableOpacity style={styles.botaoIniciar} onPress={ () => { this.onPress(1) } }>
            <Text h5 style={styles.tituloIniciar}>Iniciar</Text>
          </TouchableOpacity>
        </Animatable.View><Animatable.View animation="zoomIn" iterationCount={1} 
          style={{marginTop: 10, justifyContent: 'center', alignItems: 'center'}}>
          <TouchableOpacity style={styles.botaoVoltar} onPress={ () => { this.onPress(2) } }>
            <Text h5 style={styles.tituloVoltar}><Icon name="angle-left" size={15} color="white" /> Voltar</Text>
          </TouchableOpacity>
        </Animatable.View>
        
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
  tituloIniciar: {
    textAlign: 'center',
    color: 'white',
  },
  botaoIniciar: {
    borderRadius: 20,
    borderColor: 'white',
    backgroundColor: 'transparent',
    borderWidth: 1,
    height: 40,
    width: 200,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tituloVoltar: {
    textAlign: 'center',
    color: 'white',
  },
  botaoVoltar: {
    borderRadius: 20,
    borderColor: 'white',
    backgroundColor: 'transparent',
    borderWidth: 0,
    height: 40,
    width: 200,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titulo: {
    textAlign: 'center',
    color: 'white',
    marginBottom: 30,
    fontFamily: 'raleway-medium',
    fontSize: 25,
  },
  regras: {
    textAlign: 'center',
    color: 'white',
    marginTop: 2,
    fontFamily: 'raleway-light',
    fontSize: 15,
  },
});
