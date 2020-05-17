import React, { PureComponent } from 'react';
import { StyleSheet, Text, View, Dimensions, TouchableWithoutFeedback } from 'react-native';
import * as RootNavigation from '../RootNavigation'
import ViewsMenu from './ViewsMenu';
import { isScanInHistory } from '../API/history';
const color = require('../colors.json').default

export default class ScanItem extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            seen: false
        }
    }

    async componentDidMount() {
        this.setState({seen: await isScanInHistory(this.props.name, this.props.scan.id)})
    }

    getFontsize(length) {
        let size = infoWidth / (length / 1.9);
        if(size > 16) size = 16;
        return size < 11 ? 11 : size;
    }

    render() {
        let scan = this.props.scan;
        return (
            <TouchableWithoutFeedback onPress={() => RootNavigation.navigate('Scan', {link: scan.link})}>
                <View style={[s.scan, {backgroundColor: this.state.seen ? color.darkBackground : color.background}]}>
                    <View style={s.numDiv}>
                        <Text style={[s.text]}>{scan.id}</Text>
                    </View>
                    <View style={s.nameDiv}>
                        <Text style={[{fontSize: this.getFontsize(this.props.length), marginLeft: 3, flex: 1}, s.text]}>{scan.name}</Text>
                        <ViewsMenu id={scan.id} name={this.props.name} setState={bool => this.setState({seen: bool})} />
                    </View>
                </View>
            </TouchableWithoutFeedback>
        )
    }
}

const width = Dimensions.get('window').width;
const infoWidth = (width * 0.9) / 1;

const s = StyleSheet.create({
    scan: {
        height: 40,
        width: '100%',
        flex: 0,
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: color.dark,
    },
    numDiv:{
        flex: 0.1,
        borderRightWidth: 1,
        borderRightColor: color.dark,
        alignItems: 'center',
        justifyContent: 'center'
    },
    nameDiv:{
        flex: 1,
        alignItems: 'center',
        flexDirection: 'row'
    },    
    text: {
        color: color.text,
    },
});