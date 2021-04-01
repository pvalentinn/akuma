import React, { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoadingScreen from '../components/LoadingScreen';
import { History } from '../components/History';

export default function HistoryScreen( {navigation} ) {
    let [data, setData] = useState({ history: null })
    if (!data.history) {
        let getData = async () => {
            let json = await AsyncStorage.getItem('history');
            let history = await JSON.parse(json);
            setData({history: history})
        };
        getData()
        return <LoadingScreen />
    } else {
        return <History history={data.history} open={() => navigation.openDrawer()}/>
    }
}