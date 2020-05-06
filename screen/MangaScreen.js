import React, { useState } from 'react';
import { Text } from 'react-native';
import MangaInfo from '../components/MangaInfo';
import searchManga from '../API/searchManga';
import LoadingScreen from '../components/LoadingScreen';

export default function MangaScreen( {route} ) {
    let [data, setData] = useState(
        { 
            isSet: false,
            manga: null
        }
    );
    if (!data.manga) {
        async function x() {
            setData({isSet: true, manga: await searchManga(route.params.name)})
        }
        x()
        return <LoadingScreen />
    }
    else return <MangaInfo manga={data.manga}/>
}