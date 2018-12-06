import axios from 'axios';
import React, {Component} from 'react';
import { LinearGradient, Font } from 'expo';
import {StyleSheet, Text, View, Image, TouchableOpacity, FlatList, SafeAreaView, Dimensions, ImageView, ActivityIndicator} from 'react-native';
import * as Animatable from 'react-native-animatable';
import Icon from 'react-native-vector-icons/FontAwesome';

import ItemList from './../components/ItemList';

export default class Usuarios extends Component {

  constructor(props) {
      super(props);

      this.state = {
          usuarios : [],
          carregando : false,
          error : false,
          visible: false,
          nome: '',
          usuarios1 : [],
          nomes: [],
          cont: 1
      };
  }

  componentDidMount() {

    this.setState({ carregando : true });

    const url = 'http://gileduardo.com.br/react/api_charadas/rest.php/respostas';

    setTimeout(() => {
      axios.get(url).then(response => {
        this.setState({
          usuarios : response.data,
          carregando : false,
          carregado : true,
        });
        for (let userObject of this.state.usuarios) {
            userObject.id_usuario = cont;
            this.setState({ usuarios1:[...this.state.usuarios1, userObject]});
            cont++;
          }
        }
      }).catch(error => {
          this.setState({
            carregando : false,
            error : true,
            carregado : false
          });
        });
    }, 1000);

  }

  renderList() {

    if(this.state.carregando) {
      return <ActivityIndicator size={'large'} color={'white'}/>;
    }

    if(this.state.error) {
      return <Text> Ops!!! Algo deu errado!!! =(</Text>;
    }

    return (
      <ItemList itens={ this.state.usuarios1 }/>
    );

  }

  render() {

    //const { dados } = this.props.navigation.state.params;

    const largura = (Dimensions.get('window').width) - 80;

    return (
      <LinearGradient colors={['#34495e', '#2c3e50']} style={styles.container}>

        {
          this.state.fontLoaded ? (
            <Animatable.Text style={styles.titulo} animation="zoomIn" iterationCount={1}>Usuários</Animatable.Text>
          ) : null
        }

        <View style={styles.list}>
            { this.renderList() }
        </View>

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
