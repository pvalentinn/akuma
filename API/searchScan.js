import axios from 'react-native-axios'
import cheerio from 'react-native-cheerio'

export default async function searchScan(link) {
    let result = [];

    await axios.get(link)
    .then((res) => {
        let $ = cheerio.load(res.data);
        let pages = $('#all').find('img');
        pages.each( (i, e) => {
            result.push({id: `img${i}`, src: `https:${$(e).attr('data-src')}`})
        })
    })
    return result
} 