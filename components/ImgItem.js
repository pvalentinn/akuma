import React, { Component } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
import * as RootNavigation from '../RootNavigation';
const colors = require('../colors.json').default

export default class ImgItem extends Component{
    render() {
        let manga = this.props.manga;
        return (
            <TouchableOpacity style={styles.manga} onPress={() => RootNavigation.navigate('Manga', {name: manga.name})}>
                <Image source={{uri: manga.src}} style={styles.img}></Image>
                <View style={styles.divText}>
                    <Text style={styles.text}>{manga.name}</Text>
                </View>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    manga: {
        flex: 1,
        alignItems: 'center',
        marginHorizontal: 1,
        marginVertical: 1,
        borderWidth: 1,
        borderColor: colors.dark,
        borderWidth: 5,
        borderRadius: 7
    },
    divText: {
        flex: 0.21,
        width: '100%',
        backgroundColor: colors.dark,
        justifyContent: 'center'
    },
    text: {
        fontSize: 16,
        textAlign: 'center',
        color: colors.text,
    },
    img: {
        flex: 0.8,
        width: '100%'
    }
})