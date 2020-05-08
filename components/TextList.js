import React, { Component } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import TextItem from './TextItem'

export default class TextList extends Component {
    render(){
        let list = [...this.props.data]
        return (
            <ScrollView contentContainerStyle={{height: this.props.nbr * 50}}>
                {list.map((e, i) => {
                    return <TextItem key={`letter${i}`} data={e}/>
                })}
            </ScrollView>
        )
    }
}

const s = StyleSheet.create({
    // container: {
    //     height: this.props.nbr * 40
    // }
})