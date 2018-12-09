import React, {Component} from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const Item = props => {

  var words = props.usuario.nome.toLowerCase().split(" ");

  for (var a = 0; a < words.length; a++) {
      var w = words[a];
      words[a] = w[0].toUpperCase() + w.slice(1);
  }

  var nome = words.join(" ");
  var divisao = nome.split(" ");
  var primeiroNome = divisao[0];

    return (
        <View style={styles.caixa}>
            <View style={{backgroundColor: 'white', borderRadius: 5}}>
                <View style={{backgroundColor: '#ecf0f1', height: 20, borderTopLeftRadius: 5, borderTopRightRadius: 5}}>
                  <Text style={ styles.nome }>
                       { primeiroNome } { divisao[1] }
                  </Text>
                </View>
                <View style={{height: 80}}>
                  <Text style={{ color: props.usuario.cor1, textAlign: 'left', fontFamily: 'Arial', fontSize: 14, margin: 2}}>
                       Enigma 1: { props.usuario.pergunta1 }
                  </Text>
                  <Text style={{ color: props.usuario.cor2, textAlign: 'left', fontFamily: 'Arial', fontSize: 14, margin: 2}}>
                       Enigma 2: { props.usuario.pergunta2 }
                  </Text>
                  <Text style={{ color: props.usuario.cor3, textAlign: 'left', fontFamily: 'Arial', fontSize: 14, margin: 2}}>
                       Enigma 3: { props.usuario.pergunta3 }
                  </Text>
                  <Text style={{ color: props.usuario.cor4, textAlign: 'left', fontFamily: 'Arial', fontSize: 14, margin: 2}}>
                       Enigma 4: { props.usuario.pergunta4 }
                  </Text>
                </View>
            </View>
        </View>
    );
}


const styles = StyleSheet.create({
  nome: {
    color: '#2c3e50',
    textAlign: 'left',
    fontFamily: 'Arial',
    fontSize: 14,
    margin: 2,
    fontWeight: 'bold',
  },
  caixa: {
    flex: 1, 
    marginTop: 10,
    borderRadius: 5,
  }
});

export default Item;