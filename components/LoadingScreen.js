import React, { Component } from 'react';
import { View, Image, ScrollView } from 'react-native';

export default class LoadingScreen extends Component {
    render() {
        return (
            <View style={{flex: 1, justifyContent: "center"}}>
                <Image source={require('../assets/loading.png')} style={{height: '100%', width: 'auto', marginTop: 100}}></Image>
            </View>
        )
    }
}