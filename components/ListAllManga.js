import React, { Component, PureComponent } from 'react';
import { Text, View, ActivityIndicator, FlatList, TouchableWithoutFeedback, ColorPropType } from 'react-native';
import * as RootNavigation from '../RootNavigation';
import SearchBar from './SearchBar';
const color = require('../colors.json').default

export default class ListAllManga extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: null,
            loading: true,
            containerHeight: 0
        }
    }

    render() {
        return (
            <View style={{flex: 1}} onLayout={(event) => {
                let {x, y, width, height} = event.nativeEvent.layout; this.setState({containerHeight: height - 15})}}>
                <SearchBar containerHeight={this.state.containerHeight}/>
                <ResultsTable results={this.props.data}/>
            </View>
        )
    }
}

class Loading extends Component {
    render() {
        return (
            <View>
                <ActivityIndicator size={57} color={color.dark} />
            </View>
        )
    }
}

class ResultsTable extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            i: 35,
            data: this.props.results.slice(0, 35)
        }
        this.handleEnd = this.handleEnd.bind(this)
    }

    next35() {
        let i = this.state.i;
        this.setState({i: i+35});
        return this.props.results.slice(i, i+35);   
    }

    
    handleEnd() {
        let data = this.state.data;
        if(this.props.results.length === data.length) {
            return this.setState({i: 0})
        } else {
            let toAdd = this.next35();
            return this.setState({data: [...data, ...toAdd]})
        }
    }

    render() {
        return (
            <View style={{flex: 1}}>
                <FlatList 
                    data={this.state.data}
                    keyExtractor={(item, index) => `${index}`}
                    renderItem={({item}) => <Item text={item}/>}
                    onEndReached={this.handleEnd}
                    onEndReachedThreshold={0.1}
                    ListFooterComponent={!this.state.i ? <View /> : <Loading />}
                />
            </View>
        )
    }
}

class Item extends PureComponent {
    render() {
        return (
            <TouchableWithoutFeedback onPress={() => RootNavigation.navigate('Manga', {name: this.props.text})}>
                <View style={{height: 50, width: '100%', marginLeft: 5}}>
                    <Text>{this.props.text}</Text>
                </View>
            </TouchableWithoutFeedback>     
        )
    }
}