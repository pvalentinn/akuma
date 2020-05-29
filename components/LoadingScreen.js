import React from 'react';
import { View, Image, StyleSheet, Dimensions } from 'react-native';
const color = require('../colors.json').default

const width = Dimensions.get('screen').width

let arrayImg = [require('../assets/opmmini.gif'), require('../assets/narutomini.gif'), require('../assets/dbzmini.gif')];
let widthImg = width - 30;
let number = 0

export default function LoadingScreen() {
    number === 0 ? number = 1 : number === 1 ? number = 2 : number = 0;
    let style = number === 2 ? { width: widthImg, height: widthImg / 2.06 } : { width: widthImg, height: widthImg / 1.77 };
    let img = arrayImg[number];
    return (
        <View style={styles.container}>
            <Image source={img} style={style} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: color.background,
        justifyContent: 'center',
        alignItems: 'center'
    },
})