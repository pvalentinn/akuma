import React, { Component } from 'react';
import { StyleSheet, Image, View } from 'react-native';
const colors = require('../colors.json').default


export default class Header extends Component {
    render() {
        return(
            <View style={styles.div}>
                <Image source={require('../assets/akumascans.png')} style={{height: 75, width: '60%'}}></Image>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    div: {
        height: 80,
        alignItems: "center",
        justifyContent: "space-around",
        alignItems: 'flex-start',
        backgroundColor: colors.borders
    }
})