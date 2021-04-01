import React, { useState } from 'react';
import { View } from 'react-native';
import LoadingScreen from '../components/LoadingScreen';

export default function ParamScreen( {route} ) {
    let [data, setData] = useState({ scan: null })
    if (!data.scan) {
        setData({scan: true})
        return <LoadingScreen />
    } else {
        return <View></View>
    }
}