import React, { useState } from 'react';
import { AsyncStorage } from 'react-native';
import MangaInfo from '../components/MangaInfo';
import searchManga from '../API/searchManga';
import LoadingScreen from '../components/LoadingScreen';

export default function MangaScreen( {route} ) {
    let [data, setData] = useState({  manga: null });

    let refresh = async () => {
        // console.log('refresh')
        let apiCall = await searchManga(route.params.name);
        await AsyncStorage.setItem(`${route.params.name} mangaInfo`, JSON.stringify(apiCall));
        setData({manga: apiCall})
    }

    if (!data.manga) {
        getData = async () => {
            let currentTime = Math.round(new Date().getTime()) / 60000
            try {
                const value = await AsyncStorage.getItem(`${route.params.name} mangaInfo`);
                if (value !== null) {
                    // console.log('javais')
                    let diff = currentTime - JSON.parse(value).timestamp;
                    if (diff > 30) {
                        // console.log('javais mais time to update')
                        let apiCall = await searchManga(route.params.name);
                        await AsyncStorage.setItem(`${route.params.name} mangaInfo`, JSON.stringify(apiCall));
                        setData({manga: apiCall})
                    } else {
                        setData({manga: JSON.parse(value)})
                    }
                } else {
                    // console.log('javais aps')
                    let apiCall = await searchManga(route.params.name);
                    await AsyncStorage.setItem(`${route.params.name} mangaInfo`, JSON.stringify(apiCall));
                    setData({manga: apiCall})
                }
            } catch(e) {
                console.log(e)
            }
        }
        getData()
        return <LoadingScreen />
    } else {
        return <MangaInfo manga={data.manga} refresh={refresh}/>
    } 
}