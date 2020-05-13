import axios from 'react-native-axios';

export default async function searchBarHandler(string) {
    let result = []
    await axios.get(`https://www.frscan.me/search?query=${string}`)
    .then(async res => {
        let arrayManga = res.data.suggestions;
        await arrayManga.forEach((e,i ) => i > 10 ? null : result.push(e))
    });
    return result;
}