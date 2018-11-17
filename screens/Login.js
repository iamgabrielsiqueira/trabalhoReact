import axios from 'axios';
import React, {Component} from 'react';
import { LinearGradient, Font } from 'expo';
import { FormLabel, Button, Text, FormInput, FormValidationMessage } from 'react-native-elements'
import { StyleSheet, View, TextInput, KeyboardAvoidingView, AlertIOS, TouchableOpacity } from 'react-native';
import * as Animatable from 'react-native-animatable';

export default class Login extends Component {

  constructor(props) {
    super(props);

    this.state = { 
      username: '',
      senha: '',
      dados: [],
      error : false,
      fontLoaded: false,
      logado: false,
    };
  }

  async componentDidMount() {
    await Font.loadAsync({
      'bad-signal': require('./../assets/fonts/Bad-Signal.ttf'),
    });

    this.setState({ 
      fontLoaded: true
    });
  }

  onPress = () => {
    if(this.state.username != "" && this.state.senha != "") {
      const dados = {
        login: this.state.username,
        senha: this.state.senha,
      };

      axios({ 
          method: 'post', 
          url: 'http://www.gileduardo.com.br/react/api_charadas/rest.php/auth/',
          headers:{
            "Content-Type": "application/json" 
          }, 
          data: dados
        }).then(response => {
          if(response.data.id < 0) {
            AlertIOS.alert(
             'Erro',
             'Usuário ou senha inválida!'
            );
          } else {
            this.setState({ logado: true });
            this.navigate(response.data[0]);
          }
        }).catch(error => {
          alert('Houve um erro inesperado!!!');
        });
    }
  }

  navigate(dados) {
    this.props.navigation.navigate('Regras', { dados });
  }

  render() {
    return (
      <LinearGradient colors={['#F8EFBA', '#fe8b8a']} style={styles.container}>
        <KeyboardAvoidingView behavior="padding" enabled>

          {
            this.state.fontLoaded ? (
              <Animatable.Text animation="pulse" 
              iterationCount="infinite" direction="alternate" 
              style={styles.titulo}>ENIGMA</Animatable.Text>
            ) : null
          }

          <View style={{width: 260, marginTop: 30}}>
            <FormInput autoFocus={true} placeholder={"Username"} 
                      ref={(input) => { this.secondTextInput = input; }} style={styles.formulario} 
                      clearButtonMode={"while-editing"} returnKeyType = { "next" } 
                      onSubmitEditing={() => { this.secondTextInput.focus(); }}
                      blurOnSubmit={false} onChangeText={(username) => this.setState({username})}
            />
            <FormInput placeholder={"Senha"} style={styles.formulario}
                      clearButtonMode={"while-editing"} clearTextOnFocus={true} 
                      ref={(input) => { this.secondTextInput = input; }} 
                      returnKeyType = { "send" } secureTextEntry={true} 
                      onSubmitEditing={this.onPress}
                      onChangeText={(senha) => this.setState({senha})}
            />
          </View>
          <View style={{marginTop: 40, justifyContent: 'center', alignItems: 'center'}}>
            <TouchableOpacity style={styles.botaoLogar} onPress={this.onPress}>
              <Text h5 style={styles.tituloLogar}>Logar</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
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
  botaoLogar: {
    borderRadius: 20,
    borderColor: 'white',
    backgroundColor: 'transparent',
    borderWidth: 1,
    height: 40,
    width: 200,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titulo: {
    textAlign: 'center',
    color: 'white',
    marginBottom: 30,
    fontFamily: 'bad-signal',
    fontSize: 70,
    letterSpacing: 5,
  },
  tituloLogar: {
    textAlign: 'center',
    color: 'white',
  },
  formulario: {
    borderColor: 'gray',
    borderWidth: 1,
    color: 'white',
  },
});
