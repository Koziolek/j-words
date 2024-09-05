import { readString } from 'react-papaparse';

const transformCsvToJson = (text) => {
  let duplex = readString(text, {
    header: true,
    complete(results) {}
  });

  return duplex.data;
};

const loadWords = async () => {
  const res = await fetch(process.env.PUBLIC_URL + '/words.csv', {
    method: 'get',
    mode: 'cors',
    headers: {
      'content-type': 'text/csv;charset=UTF-8'
    }
  });
  const words = await res.text();
  return transformCsvToJson(words);
};

const groupWords = (words) => {
  const reduce = words.reduce((gr, item) => {
    const { pl } = item;
    if (!gr[pl]) {
      gr[pl] = [];
    }
    gr[pl].push(item);
    return gr;
  }, {});
  const wordGroups = [];
  for (const k in reduce) {
    wordGroups.push({
      pl: k,
      words: reduce[k]
    });
  }
  return wordGroups;
};

const randomPicker = (data, count) => {
  const shuffled = data.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

export const numberOfWords = (loader = loadWords) => {
  return loader().then((data) => {
    return data.length;
  });
};

export const randomWords = async ({
  count,
  filter = (word) => true,
  loader = loadWords,
  reducer = groupWords,
  picker = randomPicker
}) => {
  return loader()
    .then((data) => data.filter(filter))
    .then(reducer)
    .then((data) => picker(data, count));
};

export const exportForTesting = {
  transformCsvToJson,
  groupWords,
  loadWords
};
