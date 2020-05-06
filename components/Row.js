import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';

export default class Row extends Component {
    render() {
        return (
        <View style={s.div}>
            {this.props.columns}
        </View>
        )
    }
}

const s = StyleSheet.create({
    div: {
        flex: 1,
        flexDirection: "row"
    },
})