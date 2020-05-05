import axios from 'react-native-axios';
import cheerio from 'react-native-cheerio';

export default async function searchManga(string) {
    let finalString = await clearString(string)
    let result;
    await axios.get(`https://www.frscan.me/manga/${finalString}`).then(res => {
        let $ = cheerio.load(res.data);
        let chapters = $('.chapter-title-rtl');
        let scans = [];
        chapters.each((i, e) => {
            let title = $(e).find('em').text() ? true : false;
            scans.push({
                link: $(e).find('a').attr('href'),
                name: `${$(e).find('a').text()}${title ?': ' + $(e).find('em').text() : ''}`,
                key: `scan${i}`
            })
        });
        result = {
            name: string,
            img: `https:${$('.img-responsive').attr('src')}`,
            statut: $('dt:contains("Statut")').siblings().find('span').text(),
            sortie: $('dt:contains("Date")').next().text(),
            category: $('dt:contains("Catégories")').next().find('a').text(),
            views: $('dt:contains("Vues")').next().text(),
            scans: scans,
            synopsis: $('.well').find('p').text()
        }
    })
    console.log(result)
    return result;
}

function clearString(string) {
    return new Promise( resolve => {
        let regex = /[!@#$%^&*(),.……?":{}|<>/-]/g;
        let firstString = string.replace(regex, '');
        regex = / +/g;
        let secondString = firstString.replace(regex, '-');
        resolve(secondString);
    });
}