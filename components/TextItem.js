import React, { Component } from 'react';
import { View, ScrollView, Text, TouchableWithoutFeedback } from 'react-native';
import * as RootNavigation from '../RootNavigation';

export default class TextItem extends Component {
    render() {
        let letter = this.props.data
        return (
            <View>
                <Letter text={letter.name}/>
                {letter.mangas.map((e, i) => {
                    return <Manga text={e} key={`manga${i}`}/>
                })}
            </View>
            
        )
    }
}

class Manga extends Component {
    render() {
        return (
            <TouchableWithoutFeedback onPress={() => RootNavigation.navigate('Manga', {name: this.props.text})}>
                <View style={{height: 50, width: '100%'}}>
                    <Text>{this.props.text}</Text>
                </View>
            </TouchableWithoutFeedback>
        )
    }
}

class Letter extends Component {
    render() {
        return (
            <View style={{height: 50, width: '100%'}}>
                <Text>{this.props.text}</Text>
            </View>
        )
    }
} 