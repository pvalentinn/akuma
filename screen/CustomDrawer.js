import React from 'react';
import { StyleSheet, View, AsyncStorage, TouchableNativeFeedback, Text } from 'react-native';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import { FontAwesome5, Ionicons } from '@expo/vector-icons'; 

const color = require('../colors.json').default

let margin = (index) => {
    if (!index) return 150;
    else if (index === 4) return 300;
    else return 2
}

export default function CustomDrawer(props) {
    return (
      <DrawerContentScrollView>
          {props.state.routeNames.map((route, idx) => {
            if (route ===  "Manga" || route ===  "Scan") return null;
            const focused = idx === props.state.index;

            return (
              <TouchableNativeFeedback
                key={route}
                onPress={() => props.navigation.navigate(route)}>
                <View style={[s.itemDiv, {backgroundColor: focused ? color.darkBackground : color.background, marginTop: margin(idx)}]}>
                  {( () => {if (route === 'Historique') return <FontAwesome5 name="history" size={20} color={focused ? color.active : color.text} style={s.icon} /> })()}
                  {( () => {if (route === 'Tabs') return <FontAwesome5 name="torii-gate" size={20} color={focused ? color.active : color.text} style={s.icon} /> })()}
                  {( () => {if (route === 'Paramètres') return <Ionicons name="ios-settings" size={22} color={focused ? color.active : color.text} style={s.icon} /> })()}
                  <Text style={[s.text, {color: focused ? color.active : color.text}]}>
                    {route === 'Tabs' ? 'Home' : route}
                  </Text>
                </View>
              </TouchableNativeFeedback>
            );
          })}
      </DrawerContentScrollView>
    ) 
}

const s = StyleSheet.create({
    itemDiv: {
        height: 50, 
        width: '100%', 
        flex: 0, 
        alignItems:'center',
        flexDirection: 'row'
    },
    icon: {
        marginLeft: 50
    },
    text: {
        fontSize: 20,
        marginLeft: 3 
    }
});