import React, { Component, PureComponent } from 'react';
import { Text, View, ActivityIndicator, FlatList, TouchableWithoutFeedback, StyleSheet } from 'react-native';
import * as RootNavigation from '../RootNavigation';

export default class Favorites extends Component {
    render() {
        return (
            <View style={s.container}>
                <Text>Tu es sur la page des likes</Text>
            </View>
        )
    }
}

const s = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'orange'
    }
})