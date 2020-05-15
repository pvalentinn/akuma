import React, { Component, PureComponent, useDebugValue } from 'react';
import { Animated, Text, TextInput, View, StyleSheet, TouchableHighlight, Dimensions, TouchableOpacity, ScrollView, FlatList, ColorPropType } from 'react-native';
import Icon from '../assets/Icon'
import searchBarHandler from '../API/searchBarHandler'
import * as RootNavigation from '../RootNavigation'
import { Ionicons } from '@expo/vector-icons'; 

const color = require('../colors.json').default
const width = Dimensions.get('screen').width;

export default class SearchBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            display: 0,
            width: new Animated.Value(50),
            defaultValue: 'Recherche un manga',
            string: [],
        }
    }

    expand = () => {
        Animated.timing(this.state.width, {
            toValue: (width * 0.7) / 1,
            duration: 500
        }).start();
        return this.setState({display: true})
    }

    textInputHandler = async string => {
        this.setState({defaultValue: string})
        this.setState({string: await searchBarHandler(string)})
    }

    shrink = () => {
        Animated.timing(this.state.width, {
            toValue: 50,
            duration: 250
        }).start();
        return this.setState({display: false, string: [], defaultValue: 'Recherche un manga'})
    }

    render() {
        return (
            <Animated.View style={[{width: this.state.width}, s.container]}>
                <TouchableHighlight onPress={this.expand}>
                    {this.state.display ?  
                    <View>
                        <View style={s.searchBar}>
                            <TextInput 
                                style={s.textInput} 
                                onChangeText={text => this.textInputHandler(text)}
                                onFocus={() => this.setState({defaultValue: ''})}
                                value={this.state.defaultValue} 
                            />
                            <TouchableHighlight onPress={this.shrink}>
                                <Ionicons name="ios-arrow-forward" size={35} color={color.text}/>
                            </TouchableHighlight>
                        
                        </View>
                        <FlatList 
                            data={this.state.string}
                            keyExtractor={(item, index) => `${index}`}
                            renderItem={({item}) => <Item text={item.value} shrink={this.shrink}/>}
                        />
                    </View>
                    : 
                    <Icon />
                    }
                </TouchableHighlight>
            </Animated.View>
        )
    }
}

class Item extends PureComponent {

    handleRedirection = () => {
        RootNavigation.navigate('Manga', {name: this.props.text});
        this.props.shrink()
    }

    render() {
        return (
            <TouchableHighlight style={{height: 40, backgroundColor: color.borders}} onPress={this.handleRedirection}>
                <Text style={s.itemList}>{this.props.text}</Text>
            </TouchableHighlight>
        )
    }
}

const s = StyleSheet.create({
    container: {
        position:'absolute',
        top: 0,
        right: 0,
        backgroundColor: color.borders,
        zIndex: 5,
        // flex: 0,
        // alignItems: 'flex-start'
    },
    searchBar: {
        flex: 0,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    textInput: {
        color: color.text,
        height: 35,
        width: '85%',
        height: '90%'
    }, 
    itemList: {
        color: color.text,
        marginLeft: 5
    }
})