import React from 'react';
import { FlatList, Text, StyleSheet } from 'react-native'; // Maior Desempenho

import Item from './Item';

const ItemList = props => {

    const { itens } = props;

    return (
        <FlatList
            data = { itens }
            renderItem = { ({ item }) => ( <Item usuario={item}/> )}
            keyExtractor = { item => item.id_usuario }
        />
    );
};

export default ItemList;