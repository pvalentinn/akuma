import React, { Component } from 'react';
import { ScrollView, View, Dimensions, StyleSheet, Text } from 'react-native';
import ImgItem from './ImgItem';
import Row from './Row';

const color = require('../colors.json').default

export default class ImgList extends Component {

    renderImgItem() {
        let copy = [...this.props.populars];
        let finalArray = [];
        let columns = [];
        
        copy.forEach((e, i) => {
            columns.push(<ImgItem manga={copy[i]} key={`imgItem${i}`}/>)

            if((i+1)%3 === 0) {
                finalArray.push(<Row key={i} columns={columns}/>);
                columns = [];
            }
        });
        return finalArray
    }


    render(){
        return(
            <View style={s.scrollContainer}>
                <Text style={s.title}>Mises à jour des mangas populaires : </Text>
                <View style={{flex: 1}}>
                    {this.renderImgItem()}
                </View>
            </View>
        )
    }
}

const width = Dimensions.get('window').width;
const finalHeight = ((((width * 0.33) / 1) * 1.4 - 7) + ((((width * 0.33) / 1) * 1.4 - 7) *0.2 ) / 1) * 3

const s = StyleSheet.create({
    scrollContainer: {
        height: finalHeight + 95,
        paddingVertical: 20,
    },
    title: {
        color: color.text,
        fontSize: 20,
        textAlign: "center",
        marginBottom: 20
    }
})