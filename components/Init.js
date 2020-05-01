import React, { Component } from 'react';
import { View, ScrollView } from 'react-native';
import loadPopular from '../API/popular';
import ImgManga from './ImgManga';
import Header from './Header'
import LoadingScreen from './LoadingScreen';

export default class Init extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: null,
            isLoaded: false
        }
        this.data;
    }

    async componentDidMount() {
        await this.awaitSetState({data: await loadPopular()});
        await this.awaitSetState({isLoaded: true});
    }

    awaitSetState(newChange) {
        return new Promise( resolve => {
            this.setState(newChange, () => resolve());
        });
    }

    render(){
        if(!this.state.isLoaded) return <LoadingScreen />
        else {
            let copy = [...this.state.data]
            return(
                <ScrollView contentContainerStyle={{height: '120%', justifyContent: 'space-evenly'}}>
                    <Header></Header> 
                    <View style={{height: '70%'}}>
                        {copy.map( (e, i) => 
                            <>
                                {
                                (() => {
                                    if((i+1)%3 === 0) return <ImgManga data={ [this.state.data[i-2], this.state.data[i-1], this.state.data[i]] }/>
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
}