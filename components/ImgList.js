import React, { Component } from 'react';
import { ScrollView, View, Dimensions, StyleSheet } from 'react-native';
import ImgItem from './ImgItem';
import Row from './Row';

export default class ImgList extends Component {

    renderImgItem() {
        let copy = [...this.props.data];
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
            <ScrollView contentContainerStyle={s.scrollContainer}>
                <View style={{flex: 1}}>
                    {this.renderImgItem()}
                </View>
            </ScrollView>
        )
    }
}

const width = Dimensions.get('window').width;
const s = StyleSheet.create({
    scrollContainer: {
        height: ((width / 3) * 1.4 ) * 3.6
    },
})