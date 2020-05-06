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

const windowHeight = Dimensions.get('window').height - 130;
const s = StyleSheet.create({
    scrollContainer: {
        paddingVertical: 20,
        height: windowHeight + 40
      },
    div: {
        flex: 1,
        flexDirection: "row"
    },
})