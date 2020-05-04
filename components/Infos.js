import React, { Component } from 'react';
import { StyleSheet, Text, View, Modal, TouchableOpacity, Image, SafeAreaView, StatusBar } from 'react-native';


export default class Infos extends Component {
    render() {
        let manga = this.props.manga;
        return (
            <Modal transparent={true} visible={this.props.show} >
                <View style={s.container}>
                    <View style={s.content}>
                        <TouchableOpacity style={s.button} onPress={() => this.props.display()}>
                            <Image source={require('../assets/close.png')} style={s.buttonInfoImg}/>
                        </TouchableOpacity>
                        <Text>{manga.synopsis}</Text>
                    </View>
                </View>
            </Modal>
        )
    }
}

const s = StyleSheet.create({
    container: {
        backgroundColor: '#000000aa',
        flex: 1,
        justifyContent: "center",
    },
    content: {
        backgroundColor: '#fff', 
        margin: 25, 
        padding: 40,
        borderRadius: 15,
        position: 'relative'
    },
    button: {
        width: 31,
        height: 31,
        position: 'absolute',
        right: 2,
        top: 2
    },
    buttonInfoImg: {
        width: '100%',
        height: '100%'
    },  
});