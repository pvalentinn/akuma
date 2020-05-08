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
                <View style={s.header}></View>
                <View style={s.bgImg}>
                    <View style={s.divImg}>
                        <Image style={s.img} source={{uri: manga.img}}/>
                    </View>
                </View>
                <View style={s.invisible}></View>
                <View style={s.divText}>
                    <TouchableOpacity style={s.button} onPress={() => this.display()}>
                        <Image source={require('../assets/info.png')} style={s.buttonInfoImg}/>
                    </TouchableOpacity>
                   <View style={s.textContainer}>
                        <Text style={[s.nameManga, {fontSize: textContainerWidth / (manga.name.length / 1.8)}]}>{manga.name}</Text>
                   </View>
                </View>
                <View style={s.scanList}></View>
            </View>
        )
    }
};

const height = Dimensions.get('screen').height - StatusBar.currentHeight
const headerHeight = (height * 0.15) / 1;
const bgHeight = (height * 0.1) / 1; 
const divTextHeight = (height * 0.25) / 1; 
const scanListHeight = (height * 0.5) / 1; 

const width = Dimensions.get('window').width;
const textContainerWidth = (width * 0.9) / 1;
const widthImg = (width * 0.4) / 1;
 
const s = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'pink',
    },
    header: {
        // flex: 0.2,
        height: headerHeight,
        width: '100%',
        backgroundColor: color.borders,
    },
    bgImg: {
        height: bgHeight,
        width: '100%',
        zIndex: 5,
        backgroundColor: color.text,
        borderColor: '#000',
        borderTopWidth: 4,
        borderBottomWidth: 4,

    },
    invisible: {
        height: bgHeight - 8,
        width: widthImg,
        top: headerHeight + 4,
        zIndex: 50,
        position: "absolute",
        borderLeftColor: color.text,
        borderRightColor: color.text,
        borderLeftWidth: 4,
        borderRightWidth: 4,
        alignSelf: 'center'
    },
    divImg: {
        position: "absolute",
        bottom: -(widthImg * 1.4) / 3,
        width: widthImg,
        height: widthImg * 1.4,
        backgroundColor: color.text,
        alignSelf: "center",
        borderColor: '#000',
        borderWidth: 4,
        justifyContent: 'center',
        alignItems: 'center'
    },
    img: {
        width: '95%',
        height: '95%',
    },  
    divText: {
        // flex: 0.25,
        height: divTextHeight,
        width: '100%',
        backgroundColor: color.borders,
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    textContainer: {
        height: divTextHeight / 4,
        width: '90%',
        marginBottom: divTextHeight / 4,
        flex: 0,
        justifyContent: 'center'
    },
    nameManga: {
        color: color.text,
        textAlign: 'center'
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
    scanList: {
        // flex: 0.45,
        height: scanListHeight,
        width: '100%',
        backgroundColor: color.background,
    },

});