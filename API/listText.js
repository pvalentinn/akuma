import axios from 'react-native-axios';
import cheerio from 'react-native-cheerio';

export default async function listText() {
    let result = []
    let nbr
    await axios.get('https://www.frscan.me/changeMangaList?type=text')
    .then(res => {
        let $ = cheerio.load(res.data);
        nbr = $('h6').length + 27;
        let tabs = $('.panel.panel-primary.tab-header');
        tabs.each(async (i, e) => {
            let el = $(e);
            result.push({
                name: el.find('b').text(),
                mangas: await getMangas($, el),
                id: `${i}`
            })
        })
    })
    return {mangas: result, nbr: nbr}
}

function getMangas($, e) {
    return new Promise( resolve => {
        let list = [];
        let mangas = e.find('h6');
        mangas.each((i, el) => {
            list.push($(el).text())
        })
        resolve(list)
    });
}