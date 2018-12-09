import React from 'react';
import { FlatList, Text, StyleSheet } from 'react-native'; // Maior Desempenho

import RankingItem from './RankingItem';

const RankingList = props => {

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
        itens.forEach((item2, j) => {
            if(item.id_usuario == item2.id_usuario) {
                if(item2.acertou == 1) {
                    cont++;
                }
            }
        });
        item.cont = cont.toString();
        cont = 0;
    });

    arr.sort(function(a, b){return b.cont - a.cont}); 

    //console.log(arr);

    return (
        <FlatList
            data = { arr }
            renderItem = { ({ item }) => ( <RankingItem usuario={item}/> )}
            keyExtractor = { item => item.key }
        />
    );
};

export default RankingList;