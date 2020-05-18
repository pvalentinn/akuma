import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Dimensions, FlatList, ScrollView, RefreshControl, AsyncStorage } from 'react-native';

export default class ReleasesList extends Component {

    render() {
        let realeases = this.props.data
        return (
            <ScrollView contentContainerStyle={{height: height}}>
                <FlatList 
                    data={realeases}
                    keyExtractor={(item) => item.id}
                    renderItem={({item}) => <Item key={item.id} data={item} />}
                />
            </ScrollView>
        )
    }
}

class Item extends Component {
    render() {
        let manga = this.props.data
        return (
            <TouchableOpacity>
                <View>  
                    <Text>{manga.name}</Text>
                    <Text>{manga.date}</Text>
                </View>
            </TouchableOpacity>
        )
    }
}

const height = Dimensions.get('window').height * 2