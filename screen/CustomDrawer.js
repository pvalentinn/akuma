import React from 'react';
import { StyleSheet, View, TouchableNativeFeedback, Text, Dimensions, StatusBar, Image } from 'react-native';
import { DrawerContentScrollView } from '@react-navigation/drawer';
import { FontAwesome5, Ionicons } from '@expo/vector-icons'; 

const color = require('../colors.json').default;
const height = Dimensions.get('window').height - StatusBar.currentHeight;

let margin = (index) => {
    if (!index) return 0;
    else if (index === 4) return height * 0.55;
    else return 2
}

export default function CustomDrawer(props) {
    return (
      <DrawerContentScrollView>
          <Image source={require('../assets/akumascanswhite.png')} style={s.img}/>
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
          <Text style={{color: color.text}}>App made by @LenGaL</Text>
      </DrawerContentScrollView>
    ) 
}

const s = StyleSheet.create({
    img:{
        height: 75,
        width: 75 * 2.38,
        marginLeft: 25
    },
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
        marginLeft: 6 
    }
});