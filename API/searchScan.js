import axios from 'react-native-axios'
import cheerio from 'react-native-cheerio'

export default async function searchScan(link) {
    let result = [];

    await axios.get(link)
    .then((res) => {
        let $ = cheerio.load(res.data);
        let pages = $('#all').find('img');
        pages.each( (i, e) => {
            let src = $(e).attr('data-src').includes('https:') || $(e).attr('data-src').includes('http:') ? $(e).attr('data-src') : `http:${$(e).attr('data-src')}`
            result.push({id: `img${i}`, src: src})
        })
    })
    return result
} 