import React, { Component, PureComponent } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Dimensions, StatusBar } from 'react-native';
const color = require('../colors.json').default

export default class ScanItem extends PureComponent {

    getFontsize(length) {
        let size = infoWidth / (length / 1.9);
        if(size > 16) size = 16;
        return size < 11 ? 11 : size;
    }

    render() {
        let scan = this.props.scan;
        return (
            <View style={s.scan}>
                <View style={s.numDiv}>
                    <Text style={[s.text]}>{scan.id}</Text>
                </View>
                <View style={s.nameDiv}>
                    <Text style={[{fontSize: this.getFontsize(this.props.length), marginLeft: 3}, s.text]}>{scan.name}</Text>
                </View>
            </View>
        )
    }
}

const width = Dimensions.get('window').width;
const infoWidth = (width * 0.9) / 1;
const numWidth = (width * 0.1) / 1;

const s = StyleSheet.create({
    scan: {
        height: 40,
        width: '100%',
        flex: 0,
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: color.dark,
    },
    numDiv:{
        flex: 0.1,
        borderRightWidth: 1,
        borderRightColor: color.dark,
        alignItems: 'center',
        justifyContent: 'center'
    },
    nameDiv:{
        flex: 1,
        justifyContent: 'center'
    },    
    text: {
        color: color.text,
    }
});