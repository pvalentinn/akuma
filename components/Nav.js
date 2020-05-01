import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity, Image } from 'react-native';

export default class Nav extends Component {
    render() {
        return (
            <View style={styles.container}>
                <TouchableOpacity style={styles.button}>
                    <Image 
                        source={require('../assets/star.png')}
                        style={styles.img}
                    />
                </TouchableOpacity>
                <TouchableOpacity style={styles.button}>
                    <Image 
                        source={require('../assets/menu.png')}
                        style={styles.img}
                    />
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 0.25,
        flexDirection: "row",
        justifyContent: 'flex-end',
    },
    button: {
        width: 100,
        flex: 0,
        alignItems: "center",
        marginRight: 5,
        borderWidth: 2,
        borderRadius: 10,
        backgroundColor: '#15202b'
    },
    img: {
        flex: 1,
        width: '50%',
    }
})  