import React, {Component} from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const RankingItem = props => {

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
            <View>
                <View>
                  <Text style={ styles.nome }>
                       { primeiroNome } { divisao[1] } - { props.usuario.cont } pontos
                  </Text>
                </View>
            </View>
        </View>
    );
}


const styles = StyleSheet.create({
  nome: {
    color: 'white',
    textAlign: 'center',
    fontFamily: 'Arial',
    fontSize: 14,
    margin: 2,
  },
  caixa: {
    flex: 1, 
    marginTop: 10,
    borderRadius: 5,
  }
});

export default RankingItem;