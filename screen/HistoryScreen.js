import React, { useState } from 'react';
import { AsyncStorage, View } from 'react-native';
import LoadingScreen from '../components/LoadingScreen';

export default function HistoryScreen( {route} ) {
    let [data, setData] = useState({ history: null })
    if (!data.history) {
        setData({history: true})
        return <LoadingScreen />
    } else {
        return <View></View>
    }
}