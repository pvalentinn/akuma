import { AsyncStorage } from 'react-native';
import axios from 'react-native-axios';
import cheerio from 'react-native-cheerio';

async function getHistory() {
    const json = await AsyncStorage.getItem('history');
    return JSON.parse(json)
}

export async function handleRelease(name, scanLink) {
    let finalString = await clearString(name);
    let infos = await axios.get(`https://frscan.cc/manga/${finalString}`)
    .then((res) => {
        let $ = cheerio.load(res.data);
        let links = $('.chapter-title-rtl > a')
        let arrayUrl = [];
        links.each((i, e) => arrayUrl.unshift($(e).attr('href')))
        let i = arrayUrl.indexOf(scanLink) + 1;
        return {
            name: name,
            img: `https:${$('.img-responsive').attr('src')}`,
            id: i
        }
    })
    return await addToHistory(infos.name, infos.img, infos.id);
}

export async function isScanInHistory(name, id) {
    const json = await AsyncStorage.getItem('history');
    const history = await JSON.parse(json);
    let found = history.find(e => e.name === name);

    if(!found) return;
    else {
        if (found.seen.length === 0) return false
        else {
            return found.seen.find(e => e === parseInt(id)) ? true : false
        }
    }
}

export async function addToHistory(name, img, id) {
    let history = await getHistory();
    let found = history.find(e => e.name === name);
    if(!found) {
        console.log('doesnt exist');
        history.unshift({name: name, img: img, seen: [ parseInt(id) ]});
    } else {
        console.log('exist');
        if (found.seen.find(e => e === id )) return;
        found.seen.unshift(parseInt(id))
    }
    console.log(history);
    return await AsyncStorage.setItem('history', JSON.stringify(history))
}

export async function removeFromHistory(name, id) {
    let history = await getHistory();
    let found = history.find(e => e.name === name);
    if(!found) {
        console.log('doesnt exist do nothing');
    } else {
        console.log('exist');
        if (found.seen.length === 0) return console.log('pas de trucs en historique')
        else {
            found.seen.splice(found.seen.indexOf(id), 1);
        }
    }
    console.log(history);
    return await AsyncStorage.setItem('history', JSON.stringify(history))
}

export async function addMultipleToHistory(name, img, id) {
    let history = await getHistory();
    let found = history.find(e => e.name === name);
    let index = parseInt(id);
    if(!found) {
        history.unshift({name: name, img: img, seen: []});
        found = history.find(e => e.name === name);
    }
    for(index; index > 0; index--) {
        if (!found.seen.find(e => e === index )) {
            found.seen.unshift(index)
        }
    }
    console.log(history)
    return await AsyncStorage.setItem('history', JSON.stringify(history))
}

export async function removeMultipleFromHistory(name, id) {
    let history = await getHistory();
    let found = history.find(e => e.name === name);
    let index = parseInt(id)
    if(!found) {
        // history.push({name: name, seen: []});
        // found = history.find(e => e.name === name);
        console.log('doesnt exist do nothing multiple');
    }
    for(index; index > 0; index--) {
        let where = found.seen.indexOf(index)
        found.seen.splice(where, 1);
    }
    // console.log(history)
    return await AsyncStorage.setItem('history', JSON.stringify(history))
}

export async function getScanInfoFromId(name) {
    let result;
    let history = await getHistory();
    let found = history.find(e => e.name === name);
    if(!found || found.seen.length === 0) {
        result = await searchScan(name)
    } else {
        let max = Math.max(...found.seen);
        result = await searchScan(name, max)
    }
    return result;
}

async function searchScan(string, max = 1) {
    let result;
    let finalString = await clearString(string);
    await axios.get(`https://frscan.cc/manga/${finalString}`)
    .then(res => {
        let $ = cheerio.load(res.data);
        let chapters = $('.chapter-title-rtl');
        let index = chapters.length - max;
        let e = chapters[index]
        let title = $(e).find('em').text() ? true : false;
        result = {
            link: $(e).find('a').attr('href'),
            name: `${$(e).find('a').text()}${title ?': ' + $(e).find('em').text() : ''}`,
        }
    })
    return result
}

function clearString(string) {
    return new Promise( resolve => {
        let regex = /[^a-zA-Z0-9 ]/g;
        let firstString = string.replace(regex, '');
        regex = / +/g;
        let secondString = firstString.replace(regex, '-');
        resolve(secondString);
    });
}