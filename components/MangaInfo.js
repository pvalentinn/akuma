import React, { Component, useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Dimensions, StatusBar, FlatList, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Infos from './Infos';
import ScanItem from './ScanItem';
import ScrollScans from './ScrollScans';
import LoadingScreen from './LoadingScreen';
const color = require('../colors.json').default;

function setList(scans) {
    return new Promise (resolve => {
        let result = [];
        scans.forEach((e, i) => {
            result.push(<ScanItem key={e.key} scan={scans[i]}/>)
        });
        resolve(result);
    });
}

export default class MangaInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false,
            list: <LoadingScreen />
        }
        this.display = this.display.bind(this)
    }

    display() {
        let show = this.state.show;
        show === true ? show = false : show = true;
        this.setState({show: show})
    }

    awaitSetState(newChange) {
        return new Promise( resolve => {
          this.setState(newChange, () => resolve());
        });
    }

    // async updateList(manga) {
    //     if (!this.state.list) {
    //         console.log('uii')
    //         this.setState({list: await setList(manga.scans)})
    //         return <LoadingScreen />
    //     }
    //     else return <ScrollScans data={this.state.list}/>
    // }

    async componentDidMount() {
        this.setState({list: await setList(this.props.manga.scans)} )
    }

    render() {
        let manga = this.props.manga;
        return (
            <View style={s.container}>
                <Infos manga={manga} show={this.state.show} display={this.display}/>
                <View style={s.header}>
                    <View style={s.side}></View>
                    <View style={s.info}>
                        <View style={s.border}> 
                            <View style={s.divImg}>
                                <Image source={{uri: manga.img}} style={s.img} />
                            </View>
                            <TouchableOpacity style={s.button} onPress={() => this.display()}>
                                <Image source={require('../assets/info.png')} style={s.buttonInfoImg}/>
                            </TouchableOpacity>
                        </View>
                        <View style={s.divText}>
                            <Text style={[{fontSize: infoWidth / (manga.name.length / 1.8)}, s.name]}>{manga.name}</Text>
                        </View>
                    </View>
                    <View style={s.side}></View>
                </View>
                <View style={s.body}>
                    <LinearGradient colors={[color.dark, color.background]} style={s.gradient}>
                        <View style={{flex: 0.15}}>
                            <Text style={[s.gradientText]}>N°</Text>
                        </View>
                        <View>
                            <Text style={[s.gradientText]}>Nom du scan</Text>
                        </View>
                    </LinearGradient>
                    {/* <FlatList
                    data={manga.scans}
                    renderItem={({ item }) => <ScanItem scan={item}/>}
                    keyExtractor={item => item.key}
                     /> */}
                    {/* {this.state.list} */}
                    <ScrollScans data={this.state.list}/>
                </View>
            </View>
        )
    }
};

const width = Dimensions.get('window').width;
const infoWidth = (width * 0.6) / 1;

const height = Dimensions.get('window').height - StatusBar.currentHeight;
const headerHeight = (height * 0.45) / 1;
const borderHeight = (headerHeight * 0.7) / 1;

const s = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: color.darkBackground
    },
    prev: {
        position: 'absolute',
        top: 1,
        height: 20,
        width: 20
    },
    header: {
        height: headerHeight,
        flexDirection: "row",
        justifyContent: 'center'
    },
    side: {
        flex: 0.2,
        justifyContent: 'space-around',
        alignItems: 'flex-start'
    },
    info: {
        flex: 0.6,
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    border: {
        height: borderHeight,
        width: '90%',
        justifyContent: 'space-around',
        alignItems: 'center',
        borderWidth: 3,
        borderRadius: 10,
        borderColor: color.dark,
        paddingVertical: 5,
        backgroundColor: color.text,
    },
    divImg: {
        height: borderHeight - 10 ,
        width: (borderHeight / 1.4) - 10,
    },
    img: {
        height: '100%',
        width: '100%',
        borderColor: color.borders,
        borderWidth: 2,
    }, 
    divText: {
        flex: 0.7,
        width: '100%',
        flexDirection: "row",
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 3,
        borderRadius: 5,
        borderColor: color.dark,
        backgroundColor: color.text
    },
    name: {
        textAlign: 'center',
        color: color.dark
    }, 
    button: {
        width: 31,
        height: 31,
        position: 'absolute',
        bottom: 2,
        right: 2
    },
    buttonInfoImg: {
        width: '100%',
        height: '100%'
    },  
    body: {
        flex: 1,
        backgroundColor: color.background
    },
    gradient: {
        height: 40,
        width: width,
        flex: 0,
        flexDirection: 'row',
    },
    gradientNum:{
        flex: 0.1
    },  
    gradientText: {
        fontSize: 25,
        color: color.text
    }
});