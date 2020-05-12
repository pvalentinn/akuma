import axios from 'react-native-axios';
import cheerio from 'react-native-cheerio';

export default async function getAll() {
    let result = []
    await axios.get('https://www.frscan.me/changeMangaList?type=text')
    .then(res => {
        let $ = cheerio.load(res.data);
        let mangas = $('h6');
        mangas.each((i, el) => {
            result.push($(el).text())
        })
    })  
    return result
}