import React, { Component } from 'react';
import { StyleSheet, View, AsyncStorage, TouchableNativeFeedback, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { navigationRef } from './RootNavigation';
import TabsScreen from './screen/TabsScreen';
import MangaScreen from './screen/MangaScreen';
import ScanScreen from './screen/ScanScreen';
import CustomDrawer from './screen/CustomDrawer';
import HistoryScreen from './screen/HistoryScreen';
import ParamScreen from './screen/ParamScreen';

const color = require('./colors.json').default
const Drawer = createDrawerNavigator();

export default class App extends Component {

  async componentDidMount() {
    const favorites = await AsyncStorage.getItem('favorites');
    if(!favorites) await AsyncStorage.setItem('favorites', JSON.stringify([]));

    const mangas = await AsyncStorage.getItem('mangas');
    if (!mangas) await AsyncStorage.setItem('mangas', JSON.stringify([]));

    const scans = await AsyncStorage.getItem('scans');
    if (!scans) await AsyncStorage.setItem('scans', JSON.stringify([]));

    const history = await AsyncStorage.getItem('history');
    if (!history) await AsyncStorage.setItem('history', JSON.stringify([]));

    // await AsyncStorage.clear().then(() => console.log('ahah'));
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
                primary: color.active,
                card: color.borders,
                text: color.text,
                border: color.borders,
              }
            }} ref={navigationRef}>
          <Drawer.Navigator screenOptions={{headerShown: false }} drawerContent={props => <CustomDrawer {...props} /> }>
            <Drawer.Screen name="Tabs" component={TabsScreen} />
            <Drawer.Screen name="Manga" component={MangaScreen} />
            <Drawer.Screen name="Scan" component={ScanScreen} options={{gestureEnabled: false}} />
            <Drawer.Screen name="Historique" component={HistoryScreen} />
            <Drawer.Screen name="Paramètres" component={ParamScreen} />
          </Drawer.Navigator>
        </NavigationContainer>
      </View>
    );
  }
}

const s = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.background,
  },
});