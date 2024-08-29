import {readString} from "react-papaparse";

const loadWords = async () => {
    const res = await fetch(process.env.PUBLIC_URL + '/words.csv', {
        method: 'get',
        mode: 'cors',
        headers: {
            'content-type': 'text/csv;charset=UTF-8'
        }
    });

    const words = await res.text();
    let duplex = readString(words, {
        header: true,
        complete(results) {
        }
    });

    return duplex.data;
}

const numberOfWords = () => {
    return loadWords()
        .then(data => {
            return data.length
        });
}

const randomWords = async (count) => {
    const words = loadWords();
    return words
        .then(data => {
            const reduce = data.reduce((gr, item) => {
                const {pl} = item;
                if (!gr[pl]) {
                    gr[pl] = [];
                }
                gr[pl].push(item);
                return gr;
            }, {})
            const wordGroups = [];
            for (var k in reduce) {
                wordGroups.push({
                    pl: k,
                    words: reduce[k]
                });
            }
            return wordGroups;
        })
        .then(data => {
            const shuffled = data.sort(() => 0.5 - Math.random());
            return shuffled.slice(0, count);
        });
}

export {randomWords, numberOfWords};