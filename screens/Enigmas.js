import axios from 'axios';
import React, {Component} from 'react';
import { LinearGradient, Font } from 'expo';
import {StyleSheet, Text, View, Image, TouchableOpacity, FlatList, SafeAreaView, Dimensions, Alert} from 'react-native';
import * as Animatable from 'react-native-animatable';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class Enigmas extends Component {

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
      'raleway-light': require('./../assets/fonts/Raleway-Regular.ttf'),
      'raleway-medium': require('./../assets/fonts/Raleway-Medium.ttf'),
    });

    this.setState({ 
      fontLoaded: true 
    });

    const { dados } = this.props.navigation.state.params;

    const url = 'http://gileduardo.com.br/react/api_charadas/rest.php/respostas/' + dados.id;

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

    //console.log(this.state.dados);

    switch(val) {
      case 1:
        //console.log("voltar");
        this.props.navigation.navigate('Regras', { dados });
      break;
      case 2:
        //console.log("enigma 1");
        //Alert.alert("Já foi respondida!");
        this.props.navigation.navigate('Enigma1', { dados });
      break;
      case 3:
        //console.log("enigma 2");
        this.props.navigation.navigate('Enigma2', { dados });
      break;
      case 4:
        //console.log("enigma 3");
        this.props.navigation.navigate('Enigma3', { dados });
      break;
      case 5:
        //console.log("enigma 4");
        this.props.navigation.navigate('Enigma4', { dados });
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
            <Animatable.Text style={styles.titulo} animation="zoomIn" iterationCount={1}>Enigmas</Animatable.Text>
          ) : null
        }

        <Animatable.View animation="zoomIn" iterationCount={1} style={{flexDirection: 'row'}} width={largura} alignItems={'center'} justifyContent={'center'}>
          <View style={{margin:2, flex: 1}} alignItems={'center'} justifyContent={'center'}>
            <TouchableOpacity onPress={ () => { this.onPress(2, dados) } }>
              <Icon name="question" size={50} color="white" />
            </TouchableOpacity>
            <Text style={{color: 'white'}}>Enigma 1</Text>
          </View>
          <View style={{margin:2, flex: 1}} alignItems={'center'} justifyContent={'center'}>
            <TouchableOpacity onPress={ () => { this.onPress(3, dados) } }>
              <Icon name="question" size={50} color="white" />
            </TouchableOpacity>
            <Text style={{color: 'white'}}>Enigma 2</Text>
          </View>
        </Animatable.View>

        <Animatable.View animation="zoomIn" iterationCount={1} style={{flexDirection: 'row'}} width={largura} alignItems={'center'} justifyContent={'center'} marginTop={5}>
          <View style={{margin:2, flex: 1}} alignItems={'center'} justifyContent={'center'}>
            <TouchableOpacity onPress={ () => { this.onPress(4, dados) } }>
              <Icon name="question" size={50} color="white" />
            </TouchableOpacity>
            <Text style={{color: 'white'}}>Enigma 3</Text>
          </View>
          <View style={{margin:2, flex: 1}} alignItems={'center'} justifyContent={'center'}>
            <TouchableOpacity onPress={ () => { this.onPress(5, dados) } }>
              <Icon name="question" size={50} color="white" />
            </TouchableOpacity>
            <Text style={{color: 'white'}}>Enigma 4</Text>
          </View>
        </Animatable.View>

        <Animatable.View animation="zoomIn" iterationCount={1} style={{marginTop: 30, justifyContent: 'center', alignItems: 'center'}}>
            <TouchableOpacity style={styles.botaoIniciar} onPress={ () => { this.onPress(1, dados) } }>
              <Text h5 style={styles.tituloIniciar}>Voltar</Text>
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
