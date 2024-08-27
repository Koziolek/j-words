import {readString} from "react-papaparse";

const loadWords = async () => {
    const res = await fetch('/words.csv', {
        method: 'get',
        mode: 'cors',
        headers: {
            'content-type': 'text/csv;charset=UTF-8'
        }
    });

    const words = await res.text();
    let duplex = readString(words, {
        header: true,
        complete(results) {}
    });

    return duplex.data;
}

const randomWords = async (count) => {
    const words = loadWords();
    return words
        .then(data=>{
            const shuffled = data.sort(() => 0.5 - Math.random());
            return shuffled.slice(0, count);
        });
}

export {randomWords};