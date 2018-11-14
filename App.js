/*
  $ npm install react-native-textinput-effects --save
  $ npm install axios
  $ npm install --save react-navigation
  $ npm install --save react-native-elements
*/

import React from 'react';
import axios from 'axios';
import { StyleSheet, View, TextInput, KeyboardAvoidingView, AlertIOS, TouchableOpacity } from 'react-native';
import { FormLabel, Button, Text, FormInput, FormValidationMessage } from 'react-native-elements'
import { LinearGradient, Font } from 'expo';


export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = { 
      username: '',
      senha: '',
      dados: [],
      error : false,
      fontLoaded: false
    };
  }

  async componentDidMount() {
    await Font.loadAsync({
      'open-sans-bold': require('./assets/fonts/Bad-Signal.ttf'),
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
            console.log("Login valido!")
          }
        }).catch(error => {
          alert('Houve um erro inesperado!!!');
        });
    }
  }

  render() {
    return (
      <LinearGradient colors={['#F8EFBA', '#fe8b8a']} style={styles.container}>
        <KeyboardAvoidingView behavior="padding" enabled>
          {
            this.state.fontLoaded ? (
              <Text h1 style={styles.titulo}>ENIGMA</Text>
            ) : null
          }
          <View style={{width: 260, marginTop: 30}}>
            <FormInput placeholder={"Username"} style={styles.formulario} 
                    clearButtonMode={"while-editing"} onChangeText={(username) => this.setState({username})}
            />
            <FormInput placeholder={"Senha"} style={styles.formulario}
                      clearButtonMode={"while-editing"} clearTextOnFocus={true} secureTextEntry={true} 
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
    fontFamily: 'open-sans-bold',
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
