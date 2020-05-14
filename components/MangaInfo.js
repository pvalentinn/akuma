import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Dimensions, StatusBar, ScrollView, RefreshControl } from 'react-native';
import Infos from './Infos';
import ScanList from './ScanList';
const color = require('../colors.json').default;

export default class MangaInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false,
            list: null,
            refreshing: false
        }
        this.display = this.display.bind(this)
    }

    display() {
        let show = this.state.show;
        show === true ? show = false : show = true;
        this.setState({show: show})
    }

    getFontsize(string) {
        let size = textContainerWidth / (string / 1.9);
        if(size > 37) size = 37;
        return size < 15 ? 15 : size;
    }

    refreshHandler = async () => {
        this.setState({refreshing: true});
        await this.props.refresh().then(() => {
            this.setState({refreshing: false});
        });
    }

    render() {
        let manga = this.props.manga;
        return (
            <ScrollView contentContainerStyle={s.container} horizontal={false} 
            refreshControl={
                <RefreshControl
                  refreshing={this.state.refreshing}
                  onRefresh={this.refreshHandler}
                />}
            >
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
                        <Text style={[s.nameManga, {fontSize: this.getFontsize(manga.name.length)}]}>{manga.name}</Text>
                   </View>
                </View>
                    <ScanList scans={manga.scans} length={this.props.manga.name.length}/>
            </ScrollView>
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
        backgroundColor: color.background,
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
        height: divTextHeight,
        width: '100%',
        backgroundColor: color.borders,
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    textContainer: {
        height: divTextHeight / 3.5,
        width: '90%',
        marginBottom: divTextHeight / 4,
        flex: 0,
        justifyContent: 'center',
    },
    nameManga: {
        color: color.text,
        textAlign: 'center'
    },
    button: {
        width: 31,
        height: 31,
        position: 'absolute',
        bottom: 5,
        right: 5
    },
    buttonInfoImg: {
        width: '100%',
        height: '100%'
    },
    scanList: {
        minHeight: scanListHeight,
        width: '100%',
        backgroundColor: color.background,
    },

});