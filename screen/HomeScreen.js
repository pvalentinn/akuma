import React, { useState } from 'react';
import { Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ImgList from '../components/ImgList';
import LoadingScreen from '../components/LoadingScreen';
import loadPopular from '../API/popular'
import Header from '../components/Header';


const Tab = createBottomTabNavigator();

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
            <Tab.Navigator screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;
                    if (route.name === 'Populaires') {
                        iconName = focused ? 'ios-star' : 'ios-star-outline';
                    } else if (route.name === 'Liste') {
                        iconName = focused ? 'ios-list-box' : 'ios-list';
                    }
                    return <Ionicons name={iconName} size={size} color={color} />;
                    },
                })}>
                <Tab.Screen name="Populaires" component={PopularScreen} />
                <Tab.Screen name="Liste" component={ListScreen}/>
            </Tab.Navigator>
        </>
    )
}