import React, { PureComponent } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Dimensions, StatusBar } from 'react-native';
const color = require('../colors.json').default

export default class ScanItem extends PureComponent {
    render() {
        let scan = this.props.scan;
        return (
            <View style={s.scan}>
                <View style={s.numDiv}>
                    <Text style={[s.text]} minimumFontScale={numWidth / (scan.id.length / 1.8)}>{scan.id}</Text>
                </View>
                <View style={s.nameDiv}>
                    <Text style={[s.text, {marginLeft: 5}]} minimumFontScale={infoWidth / (scan.name.length / 1.8)}>{scan.name}</Text>
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