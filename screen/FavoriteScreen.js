import React, { useState } from 'react';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';
import LoadingScreen from '../components/LoadingScreen';
import Favorites from '../components/Favorites';

export default function FavoriteScreen() {
    let [data, setData] = useState({ list: null });
    if (!data.list) {
        async function x() {
            setData({list: 'oui'})
        }
        x()
        return <LoadingScreen />
    } else {
        return <Favorites />
    }
}