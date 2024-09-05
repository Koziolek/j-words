import {adjectiveFilter, adverbFilter, exportForTesting, nounFilter, numeralFilter, particleFilter, pronounFilter, verbFilter} from "./Filters";

const words = [
    {part: 'czasownik'},
    {part: 'rzeczownik'},
    {part: 'przymiotnik'},
    {part: 'zaimek'},
    {part: 'liczebnik'},
    {part: 'przysłówek'},
    {part: 'partykuła'},
]

test('Should Filter Speech part', () => {
    expect(words.filter(verbFilter).length).toBe(1);
    expect(words.filter(nounFilter).length).toBe(1);
    expect(words.filter(adjectiveFilter).length).toBe(1);
    expect(words.filter(pronounFilter).length).toBe(1);
    expect(words.filter(numeralFilter).length).toBe(1);
    expect(words.filter(adverbFilter).length).toBe(1);
    expect(words.filter(particleFilter).length).toBe(1);
})

test('Should throw on unsupported part', () =>{
    expect(() => words.filter(word => exportForTesting.speechPartFilter(word, 'unsupportedPart'))).toThrow('Invalid part of speech in filter! You pass /unsupportedPart/');
})