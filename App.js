import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import Init from './components/Init';
import Header from './components/Header';
import LoadingScreen from './components/LoadingScreen';
import loadPopular from './API/popular';

export default class App extends Component {
  constructor(props) {
      super(props);
      this.state = {
          data: null,
          isLoaded: false
      }
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

  render() {
    if(!this.state.isLoaded) return <LoadingScreen />
    else {
      return (
        <View style={styles.container}>
          <ScrollView contentContainerStyle={styles.scrollContainer}>
            <Header></Header>
            <Init data={this.state.data}></Init>
          </ScrollView>
        </View>
      );
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
