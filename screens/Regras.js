import axios from 'axios';
import React, {Component} from 'react';
import { LinearGradient, Font } from 'expo';
import {StyleSheet, Text, View, Image, TouchableOpacity, FlatList, SafeAreaView, Dimensions} from 'react-native';
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

  onPress(val, id) {
    switch(val) {
      case 1:
        //console.log("iniciar");
        this.props.navigation.navigate('Enigma1', id);
      break;
      case 2:
        //console.log("enigmas");
        this.props.navigation.navigate('Main');
      break;
      case 3:
        //console.log("ranking");
        this.props.navigation.navigate('Main');
      break;
      case 4:
        //console.log("usuarios");
        this.props.navigation.navigate('Main');
      break;
      case 5:
        //console.log("logout");
        this.props.navigation.navigate('Main');
      break;
    }
  }

  render() {

    const { dados } = this.props.navigation.state.params;

    var nome = this.titleize(dados.nome);
    var divisao = nome.split(" ");
    var primeiroNome = divisao[0];

    const largura = (Dimensions.get('window').width) - 80;

    return (
      <LinearGradient colors={['#34495e', '#2c3e50']} style={styles.container}>

        {
          this.state.fontLoaded ? (
            <Animatable.Text style={styles.titulo} animation="zoomIn" iterationCount={1}>Bem vindo, { primeiroNome }.</Animatable.Text>
          ) : null
        }

        {
          this.state.fontLoaded ? (
            <View width={largura} alignItems={'center'} justifyContent={'center'} marginTop={10} marginBottom={20}>
              <Animatable.Text style={styles.regras} animation="zoomIn" iterationCount={1} textAlign={'justify'}>
                O jogo é constituído de 4 enigmas sendo possível responder somente cada pergunta uma única vez.
              </Animatable.Text>
            </View>
          ) : null
        }

        <Animatable.View animation="zoomIn" iterationCount={1} style={{flexDirection: 'row'}} width={largura} alignItems={'center'} justifyContent={'center'}>
          <View style={{margin:2, flex: 1}} alignItems={'center'} justifyContent={'center'}>
            <TouchableOpacity onPress={ () => { this.onPress(2, dados.id) } }>
              <Icon name="question" size={50} color="white" />
            </TouchableOpacity>
            <Text style={{color: 'white'}}>Enigmas</Text>
          </View>
          <View style={{margin:2, flex: 1}} alignItems={'center'} justifyContent={'center'}>
            <TouchableOpacity onPress={ () => { this.onPress(3, dados.id) } }>
              <Icon name="trophy" size={50} color="white" />
            </TouchableOpacity>
            <Text style={{color: 'white'}}>Ranking</Text>
          </View>
        </Animatable.View>

        <Animatable.View animation="zoomIn" iterationCount={1} style={{flexDirection: 'row'}} width={largura} alignItems={'center'} justifyContent={'center'} marginTop={5}>
          <View style={{margin:2, flex: 1}} alignItems={'center'} justifyContent={'center'}>
            <TouchableOpacity onPress={ () => { this.onPress(4, dados.id) } }>
              <Icon name="user" size={50} color="white" />
            </TouchableOpacity>
            <Text style={{color: 'white'}}>Usuários</Text>
          </View>
          <View style={{margin:2, flex: 1}} alignItems={'center'} justifyContent={'center'}>
            <TouchableOpacity onPress={ () => { this.onPress(5, dados.id) } }>
              <Icon name="close" size={50} color="white" />
            </TouchableOpacity>
            <Text style={{color: 'white'}}>Logout</Text>
          </View>
        </Animatable.View>

        <Animatable.View animation="zoomIn" iterationCount={1} style={{marginTop: 30, justifyContent: 'center', alignItems: 'center'}}>
            <TouchableOpacity style={styles.botaoIniciar} onPress={ () => { this.onPress(1, dados.id) } }>
              <Text h5 style={styles.tituloIniciar}>Iniciar</Text>
            </TouchableOpacity>
        </Animatable.View>

      </LinearGradient>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
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
    color: '#ecf0f1',
    marginBottom: 30,
    fontFamily: 'raleway-medium',
    fontSize: 25,
  },
  regras: {
    textAlign: 'center',
    color: '#bdc3c7',
    marginTop: 2,
    fontFamily: 'raleway-light',
    fontSize: 15,
  },
});
