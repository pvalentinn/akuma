import React, { useState, PureComponent } from 'react';
import { Text, View, Image, FlatList, ActivityIndicator, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; 
import { getScanInfoFromId } from '../API/historyFunctions';
import * as RootNavigation from '../RootNavigation';

const color = require('../colors.json').default

export function History(props) {

    return (
        <View style={s.container}>
            <View style={s.header}>
                <TouchableOpacity activeOpacity={0.6} onPress={props.open} style={s.icon}>
                    <Ionicons name="ios-menu" size={35} color={color.text}/>
                </TouchableOpacity>
                <Text style={s.headerText}>Historique</Text>
            </View>
            <FlatList 
                data={props.history}
                keyExtractor={(item, index) => `${index}`}
                renderItem={({item}) => <Item key={item.id} data={item} />}
                initialNumToRender={10}
            />
        </View>
    )
}

let Loading = () => {
    return (
        <View>
            <ActivityIndicator size={80} color={color.dark} />
        </View>
    )
}

class Item extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            scan: null
        }
    }

    async componentDidMount() {
        this.setState({scan: await getScanInfoFromId(this.props.data.name)})
    }

    render(){
        let e = this.props.data
        return !this.state.scan ? 
        <Loading /> 
        : 
        <TouchableOpacity activeOpacity={0.7} onPress={() => RootNavigation.navigate('Scan', {link: this.state.scan.link})}>
            <View style={s.itemContainer}>
                <View style={s.itemImgDiv}>
                    <Image source={{uri: e.img}} style={s.itemImg}/>
                </View>
                <View style={s.itemTextDiv}>
                    <Text style={[s.itemMangaName, {fontSize: nameFontSize(e.name)}]}>{e.name}</Text>
                    <Text style={[s.itemMangaScan, {fontSize: scanFontSize(this.state.scan.name)}]}>{this.state.scan.name}</Text>
                </View>
            </View>
        </TouchableOpacity>

    }
}

const width = Dimensions.get("window").width;
const itemTextDivWidth = width - (72 / 1.4 + 5)

let nameFontSize = string => itemTextDivWidth / (string.length / 1.9) > 20 ? 20 : itemTextDivWidth / (string.length / 1.9) < 10 ? 10 : itemTextDivWidth / (string.length / 1.9);
let scanFontSize = string => itemTextDivWidth / (string.length / 1.9) > 13.5 ? 13.5 : itemTextDivWidth / (string.length / 1.9) < 10 ? 10 : itemTextDivWidth / (string.length / 1.9);

const s = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        height: 80,
        width: '100%',
        backgroundColor: color.borders,
        flex: 0,
        justifyContent: 'center',
        alignItems: 'center',
        flex: 0,
        flexDirection: 'row'
    },
    icon: {
        position: 'absolute',
        left: 10
    },
    headerText: {
        fontSize: 35,
        color: color.text
    },
    itemContainer: {
        height: 80,
        width: '100%',
        borderBottomWidth: 1,
        borderTopWidth: 1,
        borderColor: color.borders,
        flex: 0,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row'
    },
    itemImgDiv: {
        height: 72,
        width: 72 / 1.4,
        marginLeft: 5
    },
    itemImg: {
        width:'100%',
        height: '100%',
    },
    itemTextDiv: {
        flex: 1,
        height: 75
    },
    itemMangaName: {
        color: color.text,
        alignSelf: 'center',
        // fontSize: 20,
        textAlign: "center"
    },
    itemMangaScan: {
        color: color.text,
        alignSelf: 'center',
        // fontSize: 13.5,
        marginTop: 7,
        textAlign: "center"
    }
})