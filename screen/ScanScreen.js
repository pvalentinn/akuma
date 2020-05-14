import React, { useState } from 'react';
import { AsyncStorage } from 'react-native';
import ScanView from '../components/ScanView';
import searchScan from '../API/searchScan';
import LoadingScreen from '../components/LoadingScreen';

export default function MangaScreen( {route} ) {
    let [data, setData] = useState({ scan: null });
    if (!data.scan) {
        getData = async () => {
            try {
                const value = await AsyncStorage.getItem(`${route.params.link}`);
                if (value !== null) {
                    console.log('javais')
                    setData({scan: JSON.parse(value)})
                } else {
                    console.log('javais aps')
                    let apiCall = await searchScan(route.params.link);
                    await AsyncStorage.setItem(`${route.params.link}`, JSON.stringify(apiCall));
                    setData({scan: apiCall})
                }
            } catch(e) {
                console.log(e)
            }
        }
        getData()
        return <LoadingScreen />
    }
    else return <ScanView scan={data.scan} />
}