import { readString } from 'react-papaparse';
import { LanguageManager } from '../../languages/LanguageManager';

const transformCsvToJson = (data) => {
  let duplex = readString(data, {
    header: true,
    complete(results) {},
  });

  return duplex.data;
};

const fetcher = async () => {
  const res = await fetch(process.env.PUBLIC_URL + '/' + LanguageManager().dataFile.fileName, {
    method: 'get',
    mode: 'cors',
    headers: {
      'content-type': 'text/csv;charset=UTF-8',
    },
  });
  return res;
};

const loadWords = async () => {
  return fetcher().then((data) => {
    if (LanguageManager().dataFile.dataType.toLowerCase() === 'csv') {
      return data.text().then((text) => transformCsvToJson(text));
    } else return data.json();
  });
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
      words: reduce[k],
    });
  }
  return wordGroups;
};

const randomPicker = (data, count) => {
  const shuffled = data.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

const _postLoadTransformer = () => LanguageManager().postLoadTransformer;

export const numberOfWords = (loader = loadWords) => {
  return loader().then((data) => data.length);
};

export const randomWords = async ({
  count,
  filter = (word) => (word ? true : false),
  loader = loadWords,
  reducer = groupWords,
  picker = randomPicker,
  postLoadTransformer = _postLoadTransformer(),
}) => {
  return loader()
    .then(postLoadTransformer)
    .then((data) => data.filter(filter))
    .then(reducer)
    .then((data) => picker(data, count));
};

export const exportForTesting = {
  transformCsvToJson,
  groupWords,
  loadWords,
};
