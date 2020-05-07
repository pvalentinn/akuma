import React, { Component, useState } from 'react';
import LoadingScreen from './LoadingScreen';
import { StyleSheet, Text, View, Image, TouchableOpacity, Dimensions, StatusBar, FlatList, ScrollView } from 'react-native';

export default class ScrollScans extends Component {
    render() {
        if (!this.props.data) return <LoadingScreen />
        else 
        return (
            <ScrollView contentContainerStyle={{}}>
                {this.props.data}
            </ScrollView>
        )
    }
}