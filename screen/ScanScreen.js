import React, { useState } from 'react';
import ScanView from '../components/ScanView';
import searchScan from '../API/searchScan';
import LoadingScreen from '../components/LoadingScreen';

export default function MangaScreen( {route} ) {
    let [data, setData] = useState(
        { 
            isSet: false,
            scan: null
        }
    );
    if (!data.scan) {
        async function x() {
            setData({isSet: true, scan: await searchScan(route.params.link)})
        }
        x()
        return <LoadingScreen />
    }
    else return <ScanView scan={data.scan} />
}