import React, { Component, PureComponent } from 'react';
import { View, ActivityIndicator, FlatList, ScrollView } from 'react-native';
import * as RootNavigation from '../RootNavigation';
import ScanItem from './ScanItem';
const color = require('../colors.json').default

export default class ScanList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: this.props.scans,
            loading: true
        }
    }
    
    updateDisplay = () => 

    render() {
        return (
            <ScrollView contentContainerStyle={{flex: 1}} horizontal>
                <ResultsTable results={this.state.data} length={this.props.length} name={this.props.name} />
            </ScrollView>
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
                    renderItem={({item}) => <ScanItem scan={item} length={this.props.length} key={item.key} name={this.props.name}/>}
                    onEndReached={this.handleEnd}
                    onEndReachedThreshold={0.1}
                    ListFooterComponent={!this.state.i ? <View /> : <Loading />}
                />
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