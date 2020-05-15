import React, { useState } from 'react';
import { AsyncStorage } from 'react-native';
import ScanView from '../components/ScanView';
import searchScan from '../API/searchScan';
import LoadingScreen from '../components/LoadingScreen';

export default function ScanScreen( {route} ) {
    let [data, setData] = useState({ scan: null });
    if (!data.scan) {
        getData = async () => {
            let currentTime = Math.round(new Date().getTime()) / 60000;
            try {
                const json = await AsyncStorage.getItem(`scans`);
                const scans = await JSON.parse(json);
                let hasIt = link => scans.find(e => e.link === link) ? scans.find(e => e.link === link) : false;
                const value = hasIt(route.params.link);
                if (value) {
                    console.log('javais')
                    let diff = currentTime - value.timestamp;
                    if (diff > 30) {
                        console.log('javais mais time to update scans');
                        let apiCall = await searchScan(route.params.link);
                        console.log(scans.length)
                        scans.splice(scans.indexOf(value), 1);
                        scans.push({link: route.params.link, scans: apiCall, timestamp: Math.round(new Date().getTime()) / 60000});
                        await AsyncStorage.setItem(`scans`, JSON.stringify(scans));
                        setData({scan: apiCall});
                    } else {
                        console.log(scans.length)
                        setData({scan: value.scans})
                    }
                } else {
                    console.log('javais aps scans')
                    let apiCall = await searchScan(route.params.link);
                    if(scans.length >= 5) {
                        // console.log('trops de scans en mémoire');
                        scans.shift()
                    }
                    scans.push({link: route.params.link, scans: apiCall, timestamp: Math.round(new Date().getTime()) / 60000});
                    // console.log(scans.length)
                    await AsyncStorage.setItem(`scans`, JSON.stringify(scans));
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