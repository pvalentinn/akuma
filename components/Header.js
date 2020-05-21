import React, { Component } from 'react';
import { StyleSheet, Image, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; 
import { TouchableOpacity } from 'react-native-gesture-handler';
import * as RootNavigation from '../RootNavigation'
const colors = require('../colors.json').default


export default class Header extends Component {
    render() {
        return(
            <View style={s.div}>
                <TouchableOpacity activeOpacity={0.6} onPress={this.props.open}>
                    <Ionicons name="ios-menu" size={35} color={colors.text} style={s.icon}/>
                </TouchableOpacity>
                <Image source={require('../assets/akumascanswhite.png')} style={s.img}></Image>
            </View>
        )
    }
}

const s = StyleSheet.create({
    div: {
        height: 80,
        width: '100%',
        flex: 0,
        flexDirection: 'row',
        alignItems: "center",
        alignItems: 'center',
        backgroundColor: colors.borders,
    },
    icon: {
        marginLeft: 10
    },
    img: {
        height: 70,
        width: 70 * 2.38,
        marginLeft: 25
    }
})