import React, { useState } from 'react';
import { Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import ImgList from '../components/ImgList';
import LoadingScreen from '../components/LoadingScreen';
import loadPopular from '../API/popular'
import Header from '../components/Header';
const colors = require('../colors.json').default

const Tab = createMaterialTopTabNavigator();

function iconStyle(focused, color, name) {
    let iconName;
    if (name === 'Populaires') {
        iconName = focused ? 'ios-star' : 'ios-star-outline';
    } else if (name === 'Liste') {
        iconName = focused ? 'ios-list-box' : 'ios-list';
    }
    return <Ionicons name={iconName} color={color} size={25}/>;
}

function PopularScreen () {
    let [data, setData] = useState(
        { 
            isSet: false,
            manga: null
        }
    );
    if (!data.manga) {
        async function x() {
            setData({isSet: true, manga: await loadPopular()})
        }
        x()
        return <LoadingScreen />
    }
    else return <ImgList data={data.manga} />
}

function ListScreen() {
    return <Text>null</Text>
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