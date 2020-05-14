import React, { useState } from 'react';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import ImgList from '../components/ImgList';
import LoadingScreen from '../components/LoadingScreen';
import ListAllManga from '../components/ListAllManga';
import Header from '../components/Header';
import loadPopular from '../API/popular'
import getAll from '../API/getAll'
import FavoriteScreen from './FavoriteScreen'
const colors = require('../colors.json').default

const Tab = createMaterialTopTabNavigator();

function iconStyle(focused, color, name) {
    let iconName;
    if (name === 'Populaires') {
        iconName = focused ? 'ios-star' : 'ios-star-outline';
    } else if (name === 'Liste') {
        iconName = focused ? 'list-ul' : 'ios-list';
    } else if (name === 'Favoris') {
        iconName = focused ? 'ios-heart' : 'ios-heart-empty'
    }
    if (iconName === 'list-ul') return <FontAwesome5 name={iconName} color={color} size={19} /> 
    return <Ionicons name={iconName} color={color} size={25}/>;
}

function PopularScreen () {
    let [data, setData] = useState({ manga: null });
    if (!data.manga) {
        async function x() {
            setData({manga: await loadPopular()})
        }
        x()
        return <LoadingScreen />
    }
    else return <ImgList data={data.manga} />
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

export default function HomeScreen() {
    return (    
        <>
            <Header />
            <Tab.Navigator
            tabBarPosition='bottom' 
            tabBarOptions={
                {
                    activeTintColor: colors.active,
                    inactiveTintColor: colors.text,
                    showIcon: true,
                }
            }>
                <Tab.Screen name="Populaires" component={PopularScreen} options={{ tabBarIcon: (tabInfo) => iconStyle(tabInfo.focused, tabInfo.color, 'Populaires') }}/>
                <Tab.Screen name="Liste" component={ListScreen} options={{ tabBarIcon: (tabInfo) => iconStyle(tabInfo.focused, tabInfo.color, 'Liste') }}/>
                <Tab.Screen name="Favoris" component={FavoriteScreen} options={{ tabBarIcon: (tabInfo) => iconStyle(tabInfo.focused, tabInfo.color, 'Favoris') }}/>
            </Tab.Navigator>
        </>
    )
}