import React, { Component, PureComponent } from 'react';
import { View, ActivityIndicator, FlatList, ScrollView, RefreshControl } from 'react-native';
import ScanItem from './ScanItem';
const color = require('../colors.json').default

export default class ScanList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            i: 35,
            data: this.props.scans.slice(0, 35),
            refreshing: false,
        }
        this.handleEnd = this.handleEnd.bind(this)
    }

    next35() {
        let { i } = this.state;
        let copyResults = [...this.props.scans]
        return copyResults.slice(i, i+35);   
    }

    handleEnd() {
        let { data, i } = this.state;
        let { scans } = this.props;
        let copyData = [...data];
        let index = i
        
        if(scans.length === copyData.length) {
            return this.setState({i: 0})
        } else {
            let toAdd = this.next35();
            return this.setState({data: [...copyData, ...toAdd], i: index+35})
        }
    }

    updateDisplay = () => {
        let { data } = this.state;
        let copyData = [...data];
        this.setState({data: []}, () => this.setState({data: [...copyData]}))
    }

    render() {
        return (
            <ScrollView contentContainerStyle={{flex: 1}} horizontal>
                <FlatList 
                    data={this.state.data}
                    keyExtractor={(item, index) => `${index}`}
                    renderItem={({item}) => <ScanItem scan={item} length={this.props.name.length} key={item.key} name={this.props.name} img={this.props.img} updateDisplay={this.updateDisplay} favorite={this.props.favorite}/>}
                    onEndReached={this.handleEnd}
                    onEndReachedThreshold={0.1}
                    ListFooterComponent={!this.state.i ? <View /> : <Loading />}
                />
            </ScrollView>
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