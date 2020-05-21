import React, { Component, PureComponent } from 'react';
import { Text, View, Image, FlatList, ActivityIndicator, StyleSheet, Dimensions, TouchableNativeFeedback } from 'react-native';
import  { getScanInfoFromId } from '../API/historyFunctions'
import * as RootNavigation from '../RootNavigation';

const color = require('../colors.json').default;
const width = Dimensions.get('screen').width;
const itemTextDivWidth = (width - 150 / 1.4) - 29;

let getFontSizeTitle = (string) => {
    let size = itemTextDivWidth / (string / 1.9);
    if(size > 25) size = 25;
    return size < 14 ? 14 : size;
}

let getFontSizeScan = (string) => {
    let size = itemTextDivWidth / (string / 1.9);
    if(size > 20) size = 20;
    return size < 14 ? 14 : size;
}

export default class Favorites extends Component {
    render() {
        let favorites = this.props.favorites;
        // console.log(favorites)
        if (favorites.length === 0) 
        return <NoFavorites />
        else {
            return (
            <View style={s.container}>
                <FlatList 
                    data={favorites}
                    keyExtractor={(item, index) => `Fav${index}`}
                    renderItem={({item, index}) => <Item item={item} index={index}/>}
                />
            </View>
            )
        }
    }
}

let NoFavorites = () => {
    return (
        <View style={[s.container, {justifyContent: 'center', alignItems:'center'}]}>
            <Text style={{color: color.text, textAlign: 'center', fontSize: 20, marginHorizontal: 30}}>Tu n'as pas encore de manga favoris, n'hésite pas en ajouter pour les retrouver ici !</Text>
        </View>
    )
}

let Loading = () => {
    return (
        <View>
            <ActivityIndicator size={57} color={color.dark} />
        </View>
    )
}

class Item extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            scan: false
        }
    }

    async componentDidMount() {
        this.setState({scan: await getScanInfoFromId(this.props.item.name)})
    }

    render() {
        let item = this.props.item
        let index = this.props.index
        let lastScanSeen = this.state.scan;
        if(index % 2 == 0 ) {
            return (
                <View style={s.itemDiv}>
                    <View style={s.itemImgDiv}>
                        <Image source={{uri: item.img}} style={s.itemImg}/>
                    </View>
                    <View style={s.itemTextDiv}>
                        <TouchableNativeFeedback onPress={() => RootNavigation.navigate('Manga',  {name: item.name})}>
                            <View style={s.itemMangaNameDiv}>
                                <Text style={[s.itemMangaName, {fontSize: getFontSizeTitle(item.name.length)}]}>{item.name}</Text>
                            </View>
                        </TouchableNativeFeedback>
                        {!this.state.scan ? <Loading /> 
                        :  
                        <TouchableNativeFeedback onPress={() => RootNavigation.navigate('Scan',  {link: lastScanSeen.link})}>
                            <View style={s.itemScanDiv}>
                                <Text style={[s.itemScanText, {fontSize: getFontSizeScan(lastScanSeen.name.length)}]}>{lastScanSeen.name}</Text>
                            </View>
                        </TouchableNativeFeedback>}
                    </View>
                </View>
            )
        } else {
            return (
                <View style={s.itemDiv}>
                    <View style={s.itemTextDiv}>
                        <TouchableNativeFeedback onPress={() => RootNavigation.navigate('Manga',  {name: item.name})}>
                            <View style={s.itemMangaNameDiv}>
                                <Text style={[s.itemMangaName, {fontSize: getFontSizeTitle(item.name.length)}]}>{item.name}</Text>
                            </View>
                        </TouchableNativeFeedback>
                        {!this.state.scan ? <Loading /> 
                        :  
                        <TouchableNativeFeedback onPress={() => RootNavigation.navigate('Scan',  {link: lastScanSeen.link})}>
                            <View style={s.itemScanDiv}>
                                <Text style={[s.itemScanText, {fontSize: getFontSizeScan(lastScanSeen.name.length)}]}>{lastScanSeen.name}</Text>
                            </View>
                        </TouchableNativeFeedback>}
                    </View>
                    <View style={s.itemImgDiv}>
                        <Image source={{uri: item.img}} style={s.itemImg}/>
                    </View>
                </View>
            )
        }

    }
}

const s = StyleSheet.create({
    container: {
        flex: 1,
    },
    itemDiv: {
        backgroundColor: color.text,
        height: 160,
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: color.borders,
        borderWidth: 2,
        borderRadius: 7,
        margin: 7
    },
    itemImgDiv: {
        height: 150,
        width: 150 / 1.4,
        marginHorizontal: 5,
    },
    itemImg: {
        width: '100%',
        height: '100%'
    },
    itemTextDiv: {
        width: itemTextDivWidth,
        height: '100%',
        flex: 0,
        justifyContent: 'space-around'
    },
    itemMangaNameDiv: {
        backgroundColor: color.dark, 
        marginHorizontal: 15,
        borderRadius: 3
    },
    itemMangaName: {
        alignSelf: 'center',
        textAlign: 'center',
        color: color.text
    },
    itemScanDiv: {

    },
    itemScanText: {
        textAlign: 'center',
        marginHorizontal: 10
    }
})