import React from 'react';
import { FlatList, Text, StyleSheet } from 'react-native'; // Maior Desempenho

import Item from './Item';

const ItemList = props => {

    const { itens } = props;

    let arr = [];

    itens.forEach((item, i) => {
        item.key = i.toString();
        //arr.push(item);
        if(i == 0) {
            arr.push(item);
        }
    });

    let flag = 0;

    itens.forEach((item, i) => {
        arr.forEach((item2, j) => {
            if(item.id_usuario == item2.id_usuario) {
                flag++;
            }
        });
        if(flag == 0) {
            arr.push(item);
        }
        flag = 0;
    });

    let cont = 0;

    arr.forEach((item, i) => {
        item.pergunta1 = "Não respondeu";
        item.cor1 = "black";
        item.pergunta2 = "Não respondeu";
        item.cor2 = "black";
        item.pergunta3 = "Não respondeu";
        item.cor3 = "black";
        item.pergunta4 = "Não respondeu";
        item.cor4 = "black";
        itens.forEach((item2, j) => {
            if(item.id_usuario == item2.id_usuario) {
                if(item2.id_pergunta == "1") {
                    item.pergunta1 = item2.resposta.toString();
                    if(item2.acertou == 0) {
                        item.cor1 = "red";
                    } else {
                        item.cor1 = "green";
                    }
                } else if(item2.id_pergunta == "2") {
                    item.pergunta2 = item2.resposta.toString();
                    if(item2.acertou == 0) {
                        item.cor2 = "red";
                    } else {
                        item.cor2 = "green";
                    }
                } else if(item2.id_pergunta == "3") {
                    item.pergunta3 = item2.resposta.toString();
                    if(item2.acertou == 0) {
                        item.cor3 = "red";
                    } else {
                        item.cor3 = "green";
                    }
                } else if(item2.id_pergunta == "4") {
                    item.pergunta4 = item2.resposta.toString();
                    if(item2.acertou == 0) {
                        item.cor4 = "red";
                    } else {
                        item.cor4 = "green";
                    }
                }
            }
        });
        item.cont = cont.toString();
        cont = 0;
    });

    //console.log(arr);

    return (
        <FlatList
            data = { arr }
            renderItem = { ({ item }) => ( <Item usuario={item}/> )}
            keyExtractor = { item => item.key }
        />
    );
};

export default ItemList;