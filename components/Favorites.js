import React, { Component, PureComponent } from 'react';
import { Text, View, Image, FlatList, TouchableWithoutFeedback, StyleSheet } from 'react-native';
import * as RootNavigation from '../RootNavigation';

const color = require('../colors.json').default

export default class Favorites extends Component {
    render() {
        let favorites = this.props.favorites;
        console.log(favorites)
        if (favorites.length === 0) 
        return (
            <View style={s.container}>
                <Text>Tu n'as pas encore de manga favoris, n'hésite pas en ajouter pour les retrouver ici !</Text>
            </View>
        )

        else {
            return (
            <View style={s.container}>
                <FlatList 
                    data={favorites}
                    keyExtractor={(item, index) => `Fav${index}`}
                    renderItem={({item}) => <Item item={item}/>}
                />
            </View>
            )
        }
    }
}

class Item extends Component {
    render() {
        let item = this.props.item
        return (
            <View style={s.itemDiv}>
                <View style={s.itemImgDiv}>
                    <Image source={{uri: item.img}} style={s.itemImg}/>
                </View>
                <View>
                    <Text>{item.name}</Text>
                </View>
            </View>
        )
    }
}

const s = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'orange'
    },
    itemDiv: {
        backgroundColor: color.background,
        height: 160,
        flexDirection: 'row',
        alignItems: 'center'
    },
    itemImgDiv: {
        height: 150,
        width: 150 / 1.4,
        marginLeft: 5
    },
    itemImg: {
        width: '100%',
        height: '100%'
    }
})