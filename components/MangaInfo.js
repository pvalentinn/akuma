import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import Infos from './Infos';

export default class MangaInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false
        }
        this.display = this.display.bind(this)
    }

    display() {
        let show = this.state.show;
        show === true ? show = false : show = true;
        this.setState({show: show})
    }

    render() {
        let manga = this.props.manga;
        return (
            <View style={s.container}>
                <Infos manga={manga} show={this.state.show} display={this.display}/>
                <View style={s.header}>
                    <View style={s.side}></View>
                    <View style={s.info}>
                        <View style={s.divImg}>
                            <Image source={{uri: manga.img}} style={s.img} />
                        </View>
                        <View style={s.divText}>
                            <Text style={s.name}>{manga.name}</Text>
                        </View>
                    </View>
                    <View style={s.side}>
                        <View style={s.divImg}></View>
                        <View style={s.divText}>
                            <TouchableOpacity style={s.button} onPress={() => this.display()}>
                                <Image source={require('../assets/info.png')} style={s.buttonInfoImg}/>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                <View style={s.body}>

                </View>
            </View>
        )
    }
};

const s = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'pink'
    },
    prev: {
        position: 'absolute',
        top: 1,
        height: 20,
        width: 20
    },
    header: {
        flex: 0.4,
        flexDirection: "row"
    },
    side: {
        flex: 0.2,
        justifyContent: 'center',
        alignItems: 'flex-start'
    },
    info: {
        flex: 0.6,
        justifyContent: 'center',
        alignItems: 'center'
    },
    divImg: {
        flex: 0.7,
        width: '60%',
        marginTop: 5
    },
    img: {
        flex: 1,
        marginBottom: 20
    }, 
    divText: {
        flex: 0.3,
        backgroundColor: 'red',
        flexDirection: "row",
        justifyContent: 'center',
        alignItems: 'center'
    },
    name: {
        fontSize: 30,
    }, 
    button: {
        width: 30,
        height: 30,
    },
    buttonInfoImg: {
        width: '100%',
        height: '100%'
    },  
    body:{
        flex: 0.6,
        backgroundColor: 'orange'
    }
});