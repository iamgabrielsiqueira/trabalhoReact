import axios from 'axios';
import React, {Component} from 'react';
import { LinearGradient, Font } from 'expo';
import {StyleSheet, Text, View, Image, TouchableOpacity, Alert} from 'react-native';
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

  onPress(val, dados) {
    Alert.alert(
      'Mensagem',
      'Deseja confirmar sua resposta?',
      [
        {text: 'Cancelar', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
        {text: 'Confirmar', onPress: () => this.responder(val, dados)},
      ],
      { cancelable: false }
    )
  }

  responder(val, dados) {

    const resposta = {
      id_usuario: dados.id,
      id_pergunta: 1,
      resposta: val,
    };

    axios({ 
        method: 'post', 
        url: 'http://www.gileduardo.com.br/react/api_charadas/rest.php/responder/',
        headers:{
          "Content-Type": "application/json" 
        }, 
        data: resposta
      }).then(response => {
        let result = response.data.id;
        if(result == "-1") {
          alert('Parametro nulo!');
        } else if(result == "-2") {
          alert('Usuario, charada ou resposta nula!');
        } else if(result == "-3") {
          alert('A pergunta já foi respondida anteriormente!');
        } else {
          alert('Confirmado!');
        }
      }).catch(error => {
        alert('Houve um erro inesperado!!!');
      });

    this.navigate(dados)
  }

  navigate(dados) {
    this.props.navigation.navigate('Enigma2', { dados });
  }

  render() {

    const { dados } = this.props.navigation.state.params;

    const id = 0;

    return (
      <LinearGradient colors={['#ecf0f1', '#bdc3c7']} style={styles.container}>
        {
          this.state.fontLoaded ? (
            <View style={styles.enigma}>
              <Animatable.View animation="zoomIn" iterationCount={1} style={styles.enigma}>
                <Text style={styles.pergunta}>
                Um taco e uma bola de baseball custam juntos R$1.10. 
                O taco custa um dólar a mais que a bola. Quanto custa a bola?
                </Text>
              </Animatable.View>
            </View>
          ) : null
        }
        {
          this.state.carregado ? (
            <Animatable.View animation="zoomIn" iterationCount={1} 
              style={{marginTop: 10, justifyContent: 'center', alignItems: 'center'}}>
              <TouchableOpacity style={styles.botaoResponder} onPress={ () => { this.onPress("A", dados) } }>
                <Text h5 style={styles.tituloResposta}> R${this.state.dados[0].resp_a} </Text>
              </TouchableOpacity>
            </Animatable.View>
          ) : null
        }
        {
          this.state.carregado ? (
            <Animatable.View animation="zoomIn" iterationCount={1} 
              style={{marginTop: 10, justifyContent: 'center', alignItems: 'center'}}>
              <TouchableOpacity style={styles.botaoResponder} onPress={ () => { this.onPress("B", dados) } }>
                <Text h5 style={styles.tituloResposta}> R${this.state.dados[0].resp_b} </Text>
              </TouchableOpacity>
            </Animatable.View>
          ) : null
        }
        {
          this.state.carregado ? (
            <Animatable.View animation="zoomIn" iterationCount={1} 
              style={{marginTop: 10, justifyContent: 'center', alignItems: 'center'}}>
              <TouchableOpacity style={styles.botaoResponder} onPress={ () => { this.onPress("C", dados) } }>
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
    backgroundColor: '#f39c12',
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
    color: '#e67e22',
  },
  botaoResponder: {
    borderRadius: 20,
    borderColor: '#d35400',
    backgroundColor: 'transparent',
    borderWidth: 1,
    height: 40,
    width: 200,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
