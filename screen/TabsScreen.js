import React, { useState, lazy } from 'react';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import HomePage from '../components/HomePage';
import LoadingScreen from '../components/LoadingScreen';
import ListAllManga from '../components/ListAllManga';
import Header from '../components/Header';
import getHomeInfos from '../API/getHomeInfos'
import getAll from '../API/getAll'
import FavoriteScreen from './FavoriteScreen'
const colors = require('../colors.json').default

const Tab = createMaterialTopTabNavigator();

function iconStyle(focused, color, name) {
    let iconName;
    if (name === 'Home') {
        iconName = focused ? 'torii-gate' : 'torii-gate';
    } else if (name === 'Liste') {
        iconName = focused ? 'ios-list' : 'ios-list';
    } else if (name === 'Favoris') {
        iconName = focused ? 'ios-heart' : 'ios-heart-empty'
    }
    if (iconName === 'torii-gate') return <FontAwesome5 name="torii-gate" size={18} color={color} />
    return <Ionicons name={iconName} color={color} size={25}/>;
}

function HomeScreen () {
    let [data, setData] = useState(null);
    if (!data) {
        async function x() {
            setData(await getHomeInfos())
        }
        x()
        return <LoadingScreen />
    }
    else return <HomePage data={data} />
}

function ListScreen() {
    let [data, setData] = useState({ list: null });
    if (!data.list) {
        async function x() {
            setData({list: await getAll()})
        }
        x()
        return <LoadingScreen />
    }
    else return <ListAllManga data={data.list}/>
}

export default function TabsScreen({ navigation }) {
    return (    
        <>
            <Header open={() => navigation.openDrawer()} />
            <Tab.Navigator
            lazy
            lazyPreloadDistance={1}
            tabBarPosition='bottom' 
            tabBarOptions={
                {
                    activeTintColor: colors.active,
                    inactiveTintColor: colors.text,
                    showIcon: true,
                }
            }>
                <Tab.Screen name="Home" component={HomeScreen} options={{ tabBarIcon: (tabInfo) => iconStyle(tabInfo.focused, tabInfo.color, 'Home') }}/>
                <Tab.Screen name="Liste" component={ListScreen} options={{ tabBarIcon: (tabInfo) => iconStyle(tabInfo.focused, tabInfo.color, 'Liste') }}/>
                <Tab.Screen name="Favoris" component={FavoriteScreen} options={{ tabBarIcon: (tabInfo) => iconStyle(tabInfo.focused, tabInfo.color, 'Favoris')}}/>
            </Tab.Navigator>
        </>
    )
}