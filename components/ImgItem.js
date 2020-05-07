import React, { Component } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, Dimensions } from 'react-native';
import * as RootNavigation from '../RootNavigation';
const colors = require('../colors.json').default

export default class ImgItem extends Component{
    render() {
        let manga = this.props.manga;
        return (
            <TouchableOpacity style={styles.manga} onPress={() => RootNavigation.navigate('Manga', {name: manga.name})}>
                <View style={styles.divImg}>
                    <Image source={{uri: manga.src}} style={styles.img}></Image>
                </View>
                <View style={styles.divText}>
                    <Text style={styles.text}>{manga.name}</Text>
                </View>
            </TouchableOpacity>
        )
    }
}

const width = Dimensions.get('window').width 

const styles = StyleSheet.create({
    manga: {
        flex: 0.3,
        width: (width / 3) - 5,
        alignItems: 'center',
        marginVertical: 10,
        borderColor: colors.dark,
        borderWidth: 5,
        borderRadius: 7
    },
    divImg: {
        height: (((width / 3) * 1.4) * 0.8) / 1,
        width: '100%'
    },
    img: {
        height: '100%',
        width: '100%'
    },
    divText: {
        flex: 1,
        width: '100%',
        backgroundColor: colors.dark,
        justifyContent: 'center'
    },
    text: {
        fontSize: 16,
        textAlign: 'center',
        color: colors.text,
    },
})