import React, { Component } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, Dimensions } from 'react-native';
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

const width = Dimensions.get('window').width;
const mangaWidth = (width * 0.33) / 1;
const mangaHeight = (mangaWidth * 1.4) - 7;
const textDivText = (mangaHeight * 0.2) / 1;

const styles = StyleSheet.create({
    manga: {
        flex: 0,
        width: mangaWidth,
        height: mangaHeight + textDivText,
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 5,
        borderColor: colors.dark,
        backgroundColor: colors.dark,
        borderWidth: 5,
        borderRadius: 7
    },
    divText: {
        flex: 0,
        height: textDivText,
        width: '100%',
        backgroundColor: colors.dark,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        textAlign: 'center',
        color: colors.text,
        fontSize: 16
    },
    img: {
        width: (mangaWidth * 0.9) / 1,
        height: (mangaHeight * 0.9) / 1
    }
})