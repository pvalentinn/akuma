import React, { Component } from 'react';
import { View, Image, StyleSheet } from 'react-native';

export default class LoadingScreen extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Image source={require('../assets/loading.png')} style={styles.img}></Image>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        justifyContent: "center", 
        backgroundColor: '#27496d'
    },
    img: {
        height: '100%',
        width: '90%',
        marginTop: 250
    }
})