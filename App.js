import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView, SafeAreaView } from 'react-native';
import ImgList from './components/ImgList';
import TextList from './components/TextList';
import Header from './components/Header';
import LoadingScreen from './components/LoadingScreen';
import loadPopular from './API/popular';
import Collection from './components/Collection';


export default class App extends Component {
  constructor(props) {
      super(props);
      this.state = {
          imgList: null,
          textList: null,
          name: null,
          display: false
      }
      this.updateDisplay = this.updateDisplay.bind(this);
      this.showManga = this.showManga.bind(this);
  }

  async componentDidMount() {
      await this.awaitSetState({imgList: await loadPopular()});
      await this.awaitSetState({display: 1});
  }

  async updateDisplay(value) {
      await this.awaitSetState({display: value});
  }

  async showManga(manga) {
    await this.awaitSetState({display: false});
    await this.awaitSetState({manga: manga})
    await this.awaitSetState({display: 3});
  }

  awaitSetState(newChange) {
    return new Promise( resolve => {
      this.setState(newChange, () => resolve());
    });
  }

  render() {
    if(!this.state.display) return <LoadingScreen />
    else if (this.state.display === 1 || this.state.display === 2) {
      return (
        <View style={styles.container}>
          <ScrollView contentContainerStyle={styles.scrollContainer}>
            <Header function={this.updateDisplay}></Header>
            {this.state.display === 1 ? (<ImgList data={this.state.imgList} showManga={this.showManga} />) : (<TextList />)}
          </ScrollView>
        </View>
      )
    } else if (this.state.display === 3) {
      console.log(this.state.manga)
      return (
      <View style={styles.container}>
        <Collection manga={this.state.manga} />
      </View>
      )
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#27496d',
  },
  scrollContainer: {
    height: '120%', 
    justifyContent: 'space-evenly'
  }
});