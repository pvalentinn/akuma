import axios from 'react-native-axios';
import cheerio from 'react-native-cheerio';

export default async function loadPopular() {
    let result = [];
    await axios.get('https://www.frscan.me/')
    .then(res => {
        let $ = cheerio.load(res.data);
        let mangas = $('.span3');
        mangas.each((i, e) => {
            let element = $(e)
            result.push({
                id: `${i}`,
                name: element.find('.label.label-warning').text(),
                link: element.find('.label.label-warning').attr('href'),
                src: `https:${element.find('img').attr('src')}`
            });
        });
    });
    return result;
}