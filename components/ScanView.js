import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default class ScanView extends Component {
    render() {
        console.log(this.props.scan)
        return (
            <View style={s.container}>
                <Text>Bienvenue</Text>
            </View>
        )
    }
}

const s = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'red'
    }
})