import axios from 'react-native-axios';
import cheerio from 'react-native-cheerio';

export default async function getHomeInfos() {
    let result = {
        populars: [],
        releases: []
    };
    await axios.get('https://www.frscan.me/')
    .then(res => {
        let $ = cheerio.load(res.data);
        let populars = $('.span3');
        populars.each((i, e) => {
            let element = $(e)
            result.populars.push({
                id: `${i}`,
                name: element.find('.label.label-warning').text(),
                link: element.find('.label.label-warning').attr('href'),
                src: `https:${element.find('img').attr('src')}`
            });
        });

        let releases = $('.manga-item');
        releases.each((i, e) => {
            let element = $(e);
            let regex = /\s+/g;
            let date = element.find('small').text();
            let infos = () => {
                let text = element.find('.badge.badge-info').text();
                if(text === 'VUS' || text === 'RAW') return element.find('.badge.badge-info').text();
                else return null
            }
            let scanName = () => {
                let name = element.find('h6 > a').first().text().slice(5);
                name = name.includes('Attention:RAW') ? name.slice(0, name.indexOf('Attention:RAW')) : name
                return name.endsWith(' : ') ? name.slice(0, name.indexOf(' : ')) : name;
            }
            result.releases.push({
                id: `${i}`,
                name: element.find('a').first().text(),
                date: date.replace(regex, ''),
                scanLink: element.find('h6 > a').first().attr('href'),
                scanName: scanName(),
                infos: infos()
            });
        });

    });
    return result;
}