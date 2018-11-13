import React from 'react';
import axios from 'axios';
import { StyleSheet, Text, View, TextInput, AlertIOS, TouchableOpacity } from 'react-native';

export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = { 
      username: '',
      senha: '',
      dados: [],
      error : false
    };
  }

  onPress = () => {
    if(this.state.username != "" && this.state.senha != "") {
      const dados = {
        login: this.state.username,
        senha: this.state.senha,
      };

      axios({ 
          method: 'post', 
          url: 'http://www.gileduardo.com.br/react/api_charadas/rest.php/auth',
          headers:{
            "Content-Type": "application/json" 
          }, 
          data: dados
        }).then(response => {
          console.log(response.data.nome);
          console.log(response.data.id);
        }).catch(error => {
          alert('Houve um erro inesperado!!!');
        });
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Username:</Text>
        <TextInput style={{height: 40, width: 150, borderColor: 'gray', borderWidth: 1}} onChangeText={(username) => this.setState({username})} />
        <Text>Senha:</Text>
        <TextInput style={{height: 40, width: 150, borderColor: 'gray', borderWidth: 1}} onChangeText={(senha) => this.setState({senha})} />
        <TouchableOpacity onPress={this.onPress}>
          <Text>Logar</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
