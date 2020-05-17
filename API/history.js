import { AsyncStorage } from 'react-native';

async function getHistory() {
    const json = await AsyncStorage.getItem('history');
    return JSON.parse(json)
}

export async function isScanInHistory(name, id) {
    const json = await AsyncStorage.getItem('history');
    const history = await JSON.parse(json);
    let found = history.find(e => e.name === name);

    if(!found) return;
    else {
        if (found.seen.length === 0) return false
        else {
            return found.seen.find(e => e === id) ? true : false
        }
    }
}

export async function addToHistory(name, id) {
    let history = await getHistory();
    let found = history.find(e => e.name === name);
    if(!found) {
        console.log('doesnt exist');
        history.push({name: name, seen: [ id ]});
    } else {
        console.log('exist');
        found.seen.push(id)
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

export async function addMultipleToHistory(name, id) {
    let history = await getHistory();
    let found = history.find(e => e.name === name);
    let index = parseInt(id);
    if(!found) {
        history.push({name: name, seen: []});
        found = history.find(e => e.name === name);
    }
    for(index; index > 0; index--) {
        found.seen.push(`${index}`)
    }
    // console.log(history + 'a')
    return await AsyncStorage.setItem('history', JSON.stringify(history))
}

export async function removeMultipleFromHistory(name, id) {
    let history = await getHistory();
    let found = history.find(e => e.name === name);
    let index = parseInt(id);
    if(!found) {
        history.push({name: name, seen: []});
        found = history.find(e => e.name === name);
    }
    for(index; index > 0; index--) {
        let where = found.seen.indexOf(`${index}`)
        found.seen.splice(where, 1);
    }
    // console.log(history)
    return await AsyncStorage.setItem('history', JSON.stringify(history))
}