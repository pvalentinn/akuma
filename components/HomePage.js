import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Dimensions, ScrollView, StatusBar, RefreshControl, AsyncStorage } from 'react-native';
import ReleasesList from './ReleasesList';
import ImgList from './ImgList';

const height = (Dimensions.get('screen').height - StatusBar.currentHeight) + 200

export default class HomePage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            populars: this.props.data.populars,
            releases: this.props.data.releases,
        }
    }

    render() {
        return (
            <ScrollView nestedScrollEnabled>
                <View style={{height: height}}>
                        <ImgList populars={this.state.populars} />
                        <ReleasesList realeases={this.state.releases} />
                </View>
            </ScrollView>
        )
    }
}

