import FunkyCSVReader from '../src/browser-reader';

it('should parse csv string', () => {
  const funkyCSV = new FunkyCSVReader;
  const result = funkyCSV.parse('"col1","col2"\n"field1","123"\n');
  expect(result).toStrictEqual([{ col1: 'field1', col2: '123' }])
})