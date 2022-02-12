import FunkyCSVReader from '../src/reader.ts'

it('should initialize with default options', () => {
  const funkyCSV = new FunkyCSVReader();
  expect(funkyCSV.options).toStrictEqual({
    delimiter: ',',
    closure: '"',
    rowDelimiter: '\n',
    headerRow: 0,
    parseNumbers: false,
  });
});

it('should initialize with custom options', () => {
  const funkyCSV = new FunkyCSVReader({
    delimiter: ';',
    closure: '-',
    rowDelimiter: '\t',
    headerRow: -1,
    parseNumbers: true
  });
  expect(funkyCSV.options).toStrictEqual({
    delimiter: ';',
    closure: '-',
    rowDelimiter: '\t',
    headerRow: -1,
    parseNumbers: true
  });
});

it('should read & parse content from a csv string', () => {
  const funkyCSV = new FunkyCSVReader;
  const csvString = '"col1","col2"\n"field1","field2"\n"field3","field4"\n';
  expect(funkyCSV.getContent(csvString)).toStrictEqual([
    {
      col1: 'field1',
      col2: 'field2'
    },
    {
      col1: 'field3',
      col2: 'field4',
    }
  ]);
})

it('should keep double quotes words', () => {
  const funkyCSV = new FunkyCSVReader;
  const csvString = '"first column","second column"\n"field"1""","field2"\n"field3","field4"\n';
  expect(funkyCSV.getContent(csvString)).toStrictEqual([
    {
      firstColumn: 'field"1"',
      secondColumn: 'field2'
    },
    {
      firstColumn: 'field3',
      secondColumn: 'field4',
    }
  ]);
})