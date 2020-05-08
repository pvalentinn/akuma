import React, { Component } from 'react';
import { StyleSheet, Text, View, Modal, TouchableOpacity, Image, SafeAreaView, StatusBar } from 'react-native';


export default class Infos extends Component {
    render() {
        let manga = this.props.manga;
        let sortie = manga.sortie ? manga.sortie : '?'
        return (
            <Modal transparent={true} visible={this.props.show} >
                <View style={s.container}>
                    <View style={s.content}>
                        <TouchableOpacity style={s.button} onPress={() => this.props.display()}>
                            <Image source={require('../assets/close.png')} style={s.buttonCloseImg}/>
                        </TouchableOpacity>
                        <View style={s.infoContainer}>
                            <Text>Views :  </Text>
                            <Text>{manga.views}</Text>
                        </View>
                        <View style={s.infoContainer}>
                            <Text>Status :  </Text>
                            <Text>{manga.statut}</Text>
                        </View>
                        <View style={s.infoContainer}>
                            <Text>Sortie :  </Text>
                            <Text>{sortie}</Text>
                        </View>
                        <View style={[s.infoContainer, {marginBottom: 10}]}>
                            <Text>Category :  </Text>
                            <Text>{manga.category}</Text>
                        </View>
                        <View style={s.synopsisContainer}>
                            <Text>Résumé :</Text>
                            <Text>{manga.synopsis}</Text>
                        </View>
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
        margin: 20, 
        padding: 30,
        borderRadius: 15,
        position: 'relative',
        flex: 0.6,
        justifyContent: "center",
    },
    button: {
        width: 31,
        height: 31,
        position: 'absolute',
        right: 2,
        top: 2
    },
    buttonCloseImg: {
        width: '100%',
        height: '100%'
    },
    infoContainer: {
        flex: 0,
        flexDirection: 'row'
    },
    text: {
        textAlign: 'center'
    }  
});