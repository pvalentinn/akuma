import React, { Component } from 'react';
import { StyleSheet, View, AsyncStorage } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { navigationRef } from './RootNavigation';
import loadPopular from './API/popular';
import HomeScreen from './screen/HomeScreen'
import MangaScreen from './screen/MangaScreen'
import ScanScreen from './screen/ScanScreen'

const colors = require('./colors.json').default
const Stack = createStackNavigator();

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      populars: null
    }
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
            <Stack.Screen name="Scan" component={ScanScreen} />
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