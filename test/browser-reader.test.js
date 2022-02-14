import FunkyCSVReader from '../src/browser-reader';

it('should parse csv string', async () => {
  const funkyCSV = new FunkyCSVReader;
  await expect(funkyCSV.parse('"col1","col2"\n"field1","123"\n')).resolves.toStrictEqual([{ col1: 'field1', col2: '123' }])
});