import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Dimensions, StatusBar, ScrollView, RefreshControl, AsyncStorage } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; 
import Infos from './Infos';
import ScanList from './ScanList';
import refreshFavorite from '../API/refreshFavorite'
const color = require('../colors.json').default;

export default class MangaInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false,
            list: null,
            refreshing: false,
            favorite: false
        }
    }

    async componentDidMount() {
        let json = await AsyncStorage.getItem('favorites');
        let favorites = await JSON.parse(json);
        // console.log(favorites)
        let found = favorites.find(e => e.name === this.props.manga.name);
        // console.log(found);
        if(found) {
            this.setState({favorite: true})
            // console.log('true')
        } else {
            this.setState({favorite: false})
            // console.log('false')
        }
        //reset
        // await AsyncStorage.setItem('favorites', JSON.stringify([]))
    }

    infoHandler = () => {
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

    favoriteHandler = async () => {
        let isFavorite = this.state.favorite;
        let json = await AsyncStorage.getItem('favorites');
        let favorites = await JSON.parse(json);
        if(!isFavorite) {
            favorites.push({
                name: this.props.manga.name,
                img: this.props.manga.img,
                timestamp: this.props.manga.timestamp,
                lastScanRead: 0
            })
            // console.log(favorites)
            await AsyncStorage.setItem('favorites', JSON.stringify(favorites));
            this.setState({favorite: true})
            refreshFavorite()
        } else if (isFavorite) {
            let found = favorites.find(e => e.name === this.props.manga.name);
            favorites.splice(favorites.indexOf(found), 1);
            // console.log(favorites)
            await AsyncStorage.setItem('favorites', JSON.stringify(favorites));
            this.setState({favorite: false})
            refreshFavorite()
        }
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
                <Infos manga={manga} show={this.state.show} display={this.infoHandler}/>
                <View style={s.header}></View>
                <View style={s.bgImg}>
                    <View style={s.divImg}>
                        <Image style={s.img} source={{uri: manga.img}}/>
                    </View>
                </View>
                <View style={s.invisible}></View>
                <View style={s.divText}>
                    <TouchableOpacity style={s.buttonInfo} onPress={() => this.infoHandler()}>
                        <Ionicons name="md-information-circle-outline" size={31} color={color.text} />
                    </TouchableOpacity>
                    <TouchableOpacity style={s.buttonFavorite} onPress={() => this.favoriteHandler()}>
                        {this.state.favorite ? <Ionicons name="ios-heart" size={31} color="#BB4430" /> : <Ionicons name="ios-heart-empty" size={31} color={color.text} />}
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
        alignSelf: 'center',
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
    buttonInfo: {
        width: 31,
        height: 31,
        position: 'absolute',
        bottom: 5,
        right: 5 + 31 
    },
    buttonFavorite: {
        width: 31,
        height: 31,
        position: 'absolute',
        bottom: 5,
        right: 5
    },
    scanList: {
        minHeight: scanListHeight,
        width: '100%',
        backgroundColor: color.background,
    },

});