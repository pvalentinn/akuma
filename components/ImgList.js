import React, { Component } from 'react';
import { View } from 'react-native';
import ImgManga from './ImgManga';

export default class ImgList extends Component {
    render(){
        let copy = [...this.props.data]
        return(
            <View style={{height: '70%'}}>
                {copy.map( (e, i) => 
                    <>
                        {
                        (() => {
                            if((i+1)%3 === 0) return <ImgManga data={ [this.props.data[i-2], this.props.data[i-1], this.props.data[i]] } showManga={this.props.showManga}/>
                            else return <></>
                        })()
                        }
                    </>
                )}
            </View>
        )
    }
}