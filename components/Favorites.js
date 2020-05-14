import React, { Component, PureComponent } from 'react';
import { Text, View, ActivityIndicator, FlatList, TouchableWithoutFeedback, StyleSheet } from 'react-native';
import * as RootNavigation from '../RootNavigation';

export default class Favorites extends Component {
    render() {
        let favorites = this.props.favorites;
        console.log(favorites)
        if (favorites.length === 0) 
        return (
            <View style={s.container}>
                <Text>Tu n'as pas encore de manga favoris, n'hésite pas en ajouter pour les retrouver ici !</Text>
            </View>
        )

        else {
            return (
            <View style={s.container}>
                <Text>Bientot</Text>
            </View>
            )
        }
    }
}

const s = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'orange'
    }
})