import FunkyCSVReader from '../src/reader.ts';

it('should initialize with default options', () => {
  const funkyCSV = new FunkyCSVReader();
  expect(funkyCSV.options).toStrictEqual({
    delimiter: ',',
    closure: '"',
    newLine: '\n',
    headerRow: 0,
    parseNumbers: false,
  });
});

it('should initialize with custom options', () => {
  const funkyCSV = new FunkyCSVReader({
    delimiter: ';',
    closure: '-',
    newLine: '\t',
    headerRow: -1,
    parseNumbers: true,
  });
  expect(funkyCSV.options).toStrictEqual({
    delimiter: ';',
    closure: '-',
    newLine: '\t',
    headerRow: -1,
    parseNumbers: true,
  });
});

it('should read & parse content from a csv string', () => {
  const funkyCSV = new FunkyCSVReader();
  const csvString = '"col1","col2"\n"field1","field2"\n"field3","field4"\n';
  expect(funkyCSV.getContent(csvString)).toStrictEqual([
    {
      col1: 'field1',
      col2: 'field2',
    },
    {
      col1: 'field3',
      col2: 'field4',
    },
  ]);
});

it('should keep double quotes words', () => {
  const funkyCSV = new FunkyCSVReader();
  const csvString = '"first column","second column"\n"field"1""","field2"\n"field3","field4"\n';
  expect(funkyCSV.getContent(csvString)).toStrictEqual([
    {
      firstColumn: 'field"1"',
      secondColumn: 'field2',
    },
    {
      firstColumn: 'field3',
      secondColumn: 'field4',
    },
  ]);
});

it('should parse numeric strings to number type', async () => {
  const funkyCSV = new FunkyCSVReader({
    parseNumbers: true,
  });
  await expect(funkyCSV.getContent('"col1","col2"\n"field1","123"\n')).toStrictEqual([{ col1: 'field1', col2: 123 }]);
});

it('should parse with custom newline char', async () => {
  const funkyCSV = new FunkyCSVReader({
    newLine: '\r',
    parseNumbers: true,
  });
  expect(funkyCSV.getContent('"col1","col2"\r"field1","123"\r')).toStrictEqual([{ col1: 'field1', col2: 123 }]);
});

it('should throw an exception if csv is empty', () => {
  const funkyCSV = new FunkyCSVReader();
  const error = () => funkyCSV.getContent('');
  expect(error).toThrow();
});

it('should throw an exception if header columns does not match with row fields', () => {
  const funkyCSV = new FunkyCSVReader();
  const error = () => funkyCSV.getContent('"col1"\n"field1","field2"\n');
  expect(error).toThrow();
});

it('should start reading on headerRow value', () => {
  const funkyCSV = new FunkyCSVReader({
    headerRow: 1,
  });
  const result = funkyCSV.getContent('"col1","col2"\n"subcol1","subcol2"\n"field1","field2"');
  expect(result).toStrictEqual([{ subcol1: 'field1', subcol2: 'field2' }]);
});

it('should parse without header values', () => {
  const funkyCSV = new FunkyCSVReader({
    headerRow: -1,
  });
  const result = funkyCSV.getContent('"field1","field2"\n"field3","field4"');
  expect(result).toStrictEqual([
    ['field1', 'field2'],
    ['field3', 'field4'],
  ]);
});
