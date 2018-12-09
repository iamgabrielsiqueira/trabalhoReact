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
          fontLoaded: false,
      };
  }

  async componentDidMount() {

    await Font.loadAsync({
      'raleway-light': require('./../assets/fonts/Raleway-Regular.ttf'),
      'raleway-medium': require('./../assets/fonts/Raleway-Medium.ttf'),
    });

    this.setState({ 
      fontLoaded: true 
    });

    this.setState({ carregando : true });

    const url = 'http://gileduardo.com.br/react/api_charadas/rest.php/respostas';

    setTimeout(() => {
      axios.get(url).then(response => {
        this.setState({
          usuarios : response.data,
          carregando : false,
          carregado : true,
        });
      }).catch(error => {
          this.setState({
            carregando : false,
            error : true,
            carregado : false,
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
      <ItemList itens={ this.state.usuarios } style={{flex: 1}}/>
    );

  }

  onPress(val, dados) {

    switch(val) {
      case 1:
        this.props.navigation.navigate('Regras', { dados });
      break;
    }

  }

  render() {

    const { dados } = this.props.navigation.state.params;

    const largura = (Dimensions.get('window').width) - 80;

    return (
      <LinearGradient colors={['#34495e', '#2c3e50']} style={styles.container}>

        {
          this.state.fontLoaded ? (
            <Animatable.Text style={styles.titulo} animation="zoomIn" iterationCount={1}>Usuários</Animatable.Text>
          ) : null
        }

        <Animatable.View animation="zoomIn" iterationCount={1} style={{flex: 1, width: largura}}>
          { this.renderList() }
        </Animatable.View>

        <View style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
            <TouchableOpacity style={styles.botaoIniciar} onPress={ () => { this.onPress(1, dados) } }>
              <Text h5 style={styles.tituloIniciar}>Voltar</Text>
            </TouchableOpacity>
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
    flexDirection: 'column',
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
  titulo: {
    textAlign: 'center',
    color: '#ecf0f1',
    marginBottom: 30,
    fontFamily: 'raleway-medium',
    fontSize: 25,
    marginTop: 100,
  },
});
