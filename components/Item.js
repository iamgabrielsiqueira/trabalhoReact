import React, {Component} from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const Item = props => {

    return (
        <TouchableOpacity>
            <View>
                <Text style={ styles.texto }>
                     { props.usuario.id_usuario } - { props.usuario.nome }
                </Text>
            </View>
        </TouchableOpacity>
    );
}


const styles = StyleSheet.create({
  texto: {
   	color: 'white'
  }
});

export default Item;