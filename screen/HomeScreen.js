import React, { useState } from 'react';
import { Text } from 'react-native';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import ImgList from '../components/ImgList';
import LoadingScreen from '../components/LoadingScreen';
import TextList from '../components/TextList';
import Header from '../components/Header';
import loadPopular from '../API/popular'
import listText from '../API/listText'
const colors = require('../colors.json').default

const Tab = createMaterialTopTabNavigator();

function iconStyle(focused, color, name) {
    let iconName;
    if (name === 'Populaires') {
        iconName = focused ? 'ios-star' : 'ios-star-outline';
    } else if (name === 'Liste') {
        iconName = focused ? 'list-ul' : 'ios-list';
    }
    if (iconName === 'list-ul') return <FontAwesome5 name={iconName} color={color} size={20} /> 
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
            setData({list: await listText()})
        }
        x()
        return <LoadingScreen />
    }
    else return <TextList data={data.list.mangas} nbr={data.list.nbr}/>
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
            </Tab.Navigator>
        </>
    )
}