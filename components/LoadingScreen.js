import React, { Component } from 'react';
import { View, Image, StyleSheet, Dimensions } from 'react-native';
const color = require('../colors.json').default

export default class LoadingScreen extends Component {
    constructor(props){
        super(props);
        this.state = {
            height: 0,
            width: 0,
            i: Math.floor(Math.random() * 2) + 1 
        }
    }

    render() {
        let widthImg = this.state.width - 20
        let style = { width: widthImg, height: widthImg / 1.77 }
        return (
            <View 
            style={styles.container} 
            onLayout={(event) => {
                let {x, y, width, height} = event.nativeEvent.layout; this.setState({height: height, width: width })}
            }>
                <Image source={require('../assets/loading.gif')} style={style} />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: color.background,
        justifyContent: 'center',
        alignItems: 'center'
    },
})