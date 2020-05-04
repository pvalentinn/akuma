import React, { Component } from 'react';
import { StyleSheet, Image, View } from 'react-native';
import Nav from './Nav';


export default class Header extends Component {
    render() {
        return(
            <View style={styles.div}>
                <Image source={require('../assets/akumascans.png')} style={{flex: 0.65, width: '100%'}}></Image>
                <Nav function={this.props.function}/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    div: {
        height: '20%',
        alignItems: "center",
        justifyContent: "space-around",
        alignItems: 'flex-end',
    }
})