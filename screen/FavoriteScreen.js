import React, { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';
import LoadingScreen from '../components/LoadingScreen';
import Favorites from '../components/Favorites';

let func;

export let handleChange = async () => {
    try {
        const value = await AsyncStorage.getItem('favorites');
        func({favorites: JSON.parse(value)})
        // console.log(JSON.parse(value))
    } catch(e) {
        console.log(e)
    }
}

export default function FavoriteScreen() {
    let [data, setData] = useState({favorites: null});
    func = setData

    if (!data.favorites) {
        getData = async () => {
            try {
                const value = await AsyncStorage.getItem('favorites');
                setData({favorites: JSON.parse(value)})
                console.log(data);
            } catch(e) {
                console.log(e)
            }
        }
        getData()
        return <LoadingScreen />
    } else {
        return <Favorites favorites={data.favorites} />
    }
}