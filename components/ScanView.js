import React, { useState } from 'react';
import { View, FlatList, StyleSheet, ScrollView, Dimensions, Image, ActivityIndicator } from 'react-native';
import LoadingScreen from './LoadingScreen';

const color = require('../colors.json').default

export default function ScanView(props) {
    return (

        <View style={s.container}>
            <FlatList 
            data={props.scan}
            keyExtractor={(item, index) => item.id}
            renderItem={({item}) => <Item img={item.src} />}
            initialNumToRender={5}
            horizontal
            // contentContainerStyle={{ flex: 0, alignItems: 'center',}}
            />
        </View>
    )
}

let getHeight = (screenWidth, imgWidth, height) => (imgWidth * height) / screenWidth;
let Loading = () => {
    return (
        <View>
            <ActivityIndicator size={80} color={color.dark} />
        </View>
    )
}

function Item(props) {
    let [dimensions, setDimensions] = useState({width: null, height: null});
    let regex = /\s+/g;
    let src = props.img.replace(regex, '');

    if (!dimensions.width || !dimensions.height) {
        let getSize = async () => {
            let obj = await new Promise(async (resolve, reject) => {
                let result;
                await Image.getSize(src, (widthImg, heightImg) => result = {width: widthImg, height: heightImg});
                resolve(result)
            })
            setDimensions({width: obj.width, height: obj.height})
        }
        getSize(); 
        return <Loading />
    } else {
        let fraction = dimensions.height / dimensions.width;
        let screenWidth = Dimensions.get('window').width;
        let supposedWidth = screenWidth * fraction    
        let scrollHeight = Dimensions.get('window').height < supposedWidth ? supposedWidth : Dimensions.get('window').height
        return(
            <ScrollView contentContainerStyle={{height: scrollHeight, width: '100%', flex: 0, justifyContent: 'center'}}>
                <Image source={{uri: src}} style={{width: screenWidth, height: supposedWidth}}/>
            </ScrollView>
        )
    }
}

const s = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
    },
})