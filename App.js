import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { navigationRef } from './RootNavigation';
import loadPopular from './API/popular';
import HomeScreen from './screen/HomeScreen'
import MangaScreen from './screen/MangaScreen'

const colors = require('./colors.json').default
const Stack = createStackNavigator();

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      populars: null
    }
  }

  async componentDidMount() {
    console.log(this.state.populars)
    await this.awaitSetState({populars: await loadPopular()});
    console.log(this.state.populars)
  }

  awaitSetState(newChange) {
    return new Promise( resolve => {
      this.setState(newChange, () => resolve());
    });
  }

  render() {
    return (
      <View style={s.container}>
        <NavigationContainer theme={{
              dark: false,
              colors: {
                primary: colors.active,
                card: colors.borders,
                text: colors.text,
                border: colors.borders,
              }
            }} ref={navigationRef}>
          <Stack.Navigator screenOptions={{headerShown: false }} >
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Manga" component={MangaScreen} />
            {/* <Stack.Screen name="Scan" component={ScanScreen} /> */}
          </Stack.Navigator>
        </NavigationContainer>
      </View>
    );
  }
}

const s = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background
  },
});