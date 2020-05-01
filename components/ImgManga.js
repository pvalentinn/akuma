import React, { Component } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';

export default class ImgManga extends Component{
    render() {
        let mangas = [...this.props.data];
        return (
            <View style={styles.div}>
                <TouchableOpacity style={styles.manga}>
                    <Image source={{uri: mangas[0].src}} style={styles.img}></Image>
                    <View style={styles.divText}>
                        <Text style={styles.text}>{mangas[0].name}</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.manga}>
                    <Image source={{uri: mangas[1].src}} style={styles.img}></Image>
                    <View style={styles.divText}>
                        <Text style={styles.text}>{mangas[1].name}</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.manga}>
                    <Image source={{uri: mangas[2].src}} style={styles.img}></Image>
                    <View style={styles.divText}>
                        <Text style={styles.text}>{mangas[2].name}</Text>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    div: {
        flex: 1,
        flexDirection: "row"
    },
    manga: {
        flex: 1,
        alignItems: 'center',
        marginHorizontal: 1,
        marginVertical: 1,
        borderWidth: 1,
        borderColor: '#15202b',
        borderWidth: 5,
        borderRadius: 7
    },
    divText: {
        flex: 0.21,
        width: '100%',
        backgroundColor: '#15202b',
        justifyContent: 'center'
    },
    text: {
        fontSize: 16,
        textAlign: 'center',
        color: '#dbdbdb',
    },
    img: {
        flex: 0.8,
        width: '100%'
    }
})