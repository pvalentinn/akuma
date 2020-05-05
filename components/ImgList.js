import React, { Component } from 'react';
import { ScrollView, View, Dimensions, StyleSheet } from 'react-native';
import ImgManga from './ImgManga';

export default class ImgList extends Component {
    render(){
        let copy = [...this.props.data]
        return(
            <ScrollView contentContainerStyle={s.scrollContainer}>
                <View style={{flex: 1}}>
                    {copy.map( (e, i) => 
                        <>
                            {
                            (() => {
                                if((i+1)%3 === 0) return <ImgManga data={ [this.props.data[i-2], this.props.data[i-1], this.props.data[i]] } showManga={this.props.showManga} navigation={this.props.navigation}/>
                                else return <></>
                            })()
                            }
                        </>
                    )}
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
      }
})