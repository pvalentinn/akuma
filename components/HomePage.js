import React, { Component } from 'react';
import { View, ScrollView } from 'react-native';
import ReleasesList from './ReleasesList';
import ImgList from './ImgList';


export default class HomePage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            populars: this.props.data.populars,
            releases: this.props.data.releases,
        }
    }

    render() {
        return (
            <ScrollView nestedScrollEnabled>
                <View>
                    <ImgList populars={this.state.populars} />
                    <ReleasesList realeases={this.state.releases} />
                </View>
            </ScrollView>
        )
    }
}

