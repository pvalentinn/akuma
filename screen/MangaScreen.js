import React, { useState } from 'react';
import { AsyncStorage } from 'react-native';
import MangaInfo from '../components/MangaInfo';
import searchManga from '../API/searchManga';
import LoadingScreen from '../components/LoadingScreen';

export default function MangaScreen( {route} ) {
    let [data, setData] = useState({  manga: null });

    let refresh = async (name) => {
        console.log('refresh ' + name)
        const json = await AsyncStorage.getItem(`mangas`);
        const mangas = await JSON.parse(json);
        let apiCall = await searchManga(name);
        mangas[name] = apiCall
        await AsyncStorage.setItem('mangas', JSON.stringify(mangas));
        setData({manga: apiCall})
    }

    if (!data.manga) {
        getData = async () => {
            let currentTime = Math.round(new Date().getTime()) / 60000
            try {
                const json = await AsyncStorage.getItem(`mangas`);
                const mangas = await JSON.parse(json);
                let hasIt = name => mangas.hasOwnProperty(name) ? mangas[name] : false;
                const value = hasIt(route.params.name)
                // console.log(value)
                if (value) {
                    console.log('javais')
                    let diff = currentTime - value.timestamp;
                    if (diff > 30) {
                        console.log('javais mais time to update')
                        let apiCall = await searchManga(route.params.name);
                        mangas[route.params.name] = apiCall
                        // console.log(mangas)
                        await AsyncStorage.setItem('mangas', JSON.stringify(mangas));
                        setData({manga: apiCall})
                    } else {
                        setData({manga: value})
                    }
                } else {
                    console.log('javais aps')
                    let apiCall = await searchManga(route.params.name);
                    mangas[route.params.name] = apiCall
                    // console.log(mangas)
                    await AsyncStorage.setItem('mangas', JSON.stringify(mangas));
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