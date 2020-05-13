import React, { Component, PureComponent } from 'react';
import { Animated, Text, TextInput, View, StyleSheet, TouchableHighlight, Dimensions, TouchableOpacity, ScrollView, FlatList } from 'react-native';
import Icon from '../assets/Icon'
import searchBarHandler from '../API/searchBarHandler'
import * as RootNavigation from '../RootNavigation'
import { MaterialIcons } from '@expo/vector-icons'; 

const color = require('../colors.json').default

export default class SearchBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            top: new Animated.Value(this.props.containerHeight - 40),
            heightWidth: new Animated.Value(36),
            widthSearchBar: new Animated.Value(0),
            display: false,
            defaultValue: 'Recherche un manga',
            width: 0,
            height: 0,
            string: [],
        }
    }

    moveUp = () => {
        Animated.timing(this.state.top, {
            toValue: 20,
            duration: 1000
        }).start();
        Animated.timing(this.state.heightWidth, {
            toValue: 40,
            duration: 1000
        }).start();
        return this.setState({display: true})
    }

    moveDown = () => {
        Animated.timing(this.state.top, {
            toValue: this.props.containerHeight - 40,
            duration: 1000
        }).start();
        Animated.timing(this.state.heightWidth, {
            toValue: 36,
            duration: 1000
        }).start();
        return this.setState({display: false, string: []})
    }

    expand = () => {
        Animated.timing(this.state.widthSearchBar, {
            toValue: width - 50,
            duration: 1000
        }).start();
        return this.setState({display: true})
    }

    shrink = () => {
        Animated.timing(this.state.widthSearchBar, {
            toValue: 0,
            duration: 1000
        }).start();
        return this.setState({display: false, string: []})
    }

    searchButtonHandler = (string) => {
        if(!this.state.display) {
            this.moveUp();
            this.expand();
        } else {
            return
        }
    }

    textInputHandler = async string => {
        this.setState({defaultValue: string})
        this.setState({string: await searchBarHandler(string)})
    }

    cancelButtonHandler = () => {
        this.moveDown();
        this.shrink();
        this.setState({string: [], defaultValue: 'Recherche un manga'})
    }

    render() {
        let heightFlatList = this.state.string.length * 40;
        return (
            <Animated.View style={[s.animatedContainer, {top: this.state.top}]}>
                <Animated.View style={[s.searchBarContainer, {height: this.state.heightWidth}]}>
                    <Animated.View style={[s.animatedSearchBar, {width: this.state.widthSearchBar}]}>
                        <View style={s.searchBar} onLayout={(event) => {
                        let {x, y, width, height} = event.nativeEvent.layout; this.setState({width: (width * 0.02) / 1, height: height})}}>
                            <TextInput 
                            style={[s.textInput, {paddingLeft: this.state.width}]} 
                            onChangeText={text => this.textInputHandler(text)}
                            onFocus={() => this.setState({defaultValue: ''})}
                            value={this.state.defaultValue} 
                            />
                            <TouchableOpacity style={s.cancelHandler} onPress={this.cancelButtonHandler}>
                                <View style={s.cancelDiv}>
                                    <MaterialIcons name="cancel" size={this.state.width + 1} color="#4285F4"/>
                                    <Text style={[s.cancel, {fontSize: this.state.width + 1}]}>Annuler</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </Animated.View>
                    <Animated.View style={[{flex: 0, justifyContent: 'center'}, {width: this.state.heightWidth}]}> 
                        <TouchableHighlight style={s.searchButton} onPress={this.searchButtonHandler}>
                            <Icon />
                        </TouchableHighlight>
                    </Animated.View>
                </Animated.View>
                <View style={[s.results, {height: heightFlatList}]}>    
                    <FlatList 
                        data={this.state.string}
                        keyExtractor={(item, index) => `${index}`}
                        renderItem={({item}) => <Item text={item.value}/>}
                    />
                </View>
            </Animated.View>
        )
    }
}

class Item extends PureComponent {
    render() {
        return (
            <TouchableHighlight style={{height: 40}} onPress={() => RootNavigation.navigate('Manga', {name: this.props.text})}>
                <Text style={s.itemList}>{this.props.text}</Text>
            </TouchableHighlight>
        )
    }
}

const width = Dimensions.get('screen').width;

const s = StyleSheet.create({
    animatedContainer: {
        position: "absolute",
        flex: 0,
        width: width,
        zIndex: 50,
    },
    searchBarContainer: {
        width: '100%',
        flexDirection: "row",
        alignItems: 'flex-start',
        justifyContent: 'flex-end',
    },
    searchButton: {
        backgroundColor: color.background,
        paddingHorizontal: 4,
        height: '95%',
        width: '95%',
        borderWidth: 1,
        borderRadius: 50,
        borderColor: color.dark,
        position: 'absolute',
        right: 5,
        top: -3,
    },
    animatedSearchBar: {
        height: '70%',
        position: 'absolute',
        right: 19,
    },
    searchBar: {
        width: '100%',
        height: '100%',
        backgroundColor: color.borders,
        borderTopLeftRadius: 50,
        borderBottomLeftRadius: 50,
        flex: 0,
        flexDirection: 'row', 
        alignItems: 'center'
    },
    textInput: {
        width: '80%',
        height: '85%',
        backgroundColor: color.background,
        color: color.text,
        marginLeft: 7,
        borderTopLeftRadius: 50,
        borderBottomLeftRadius: 50,
    },
    cancelHandler: {
        flex: 1,
        height: '60%',
    },
    cancelDiv: {
        flex: 0,
        width: '100%',
        height: '100%',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    cancel: {
        color: '#4285F4',
    },
    results: {
        width: '80%',
        position: 'relative',
        top: -(40 * 0.31) / 1,
        backgroundColor: color.borders,
        alignSelf: 'center',
    },
    itemList: {
        color: color.text,
        marginLeft: 5,
    }
})