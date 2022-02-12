import FunkyCSV from '../src/writer.ts';

it('should initialize with default options', () => {
  const funkyCSV = new FunkyCSV();
  const options = funkyCSV.getOptions();
  expect(options).toStrictEqual({
    filename: 'output.csv',
    delimiter: ',',
    closure: '"',
  });
});

it('should initialize with custom options', () => {
  const funkyCSV = new FunkyCSV({
    filename: 'custom.csv',
    delimiter: ';',
    closure: '-',
  });
  const options = funkyCSV.getOptions();
  expect(options).toStrictEqual({
    filename: 'custom.csv',
    delimiter: ';',
    closure: '-'
  });
});

it('should set header', () => {
  const funkyCSV = new FunkyCSV();
  funkyCSV.setHeader(['Column Title 1', 'Column Title 2']);

  expect(funkyCSV.getCsv()).toBe('"Column Title 1","Column Title 2"\n');
});

it('should set content', () => {
  const funkyCSV = new FunkyCSV();
  funkyCSV.setContent([
    {
      cell1: 'Content Cell 1a',
      cell2: 'Content Cell 2a',
    },
    {
      cell1: 'Content Cell 1b',
      cell2: 'Content Cell 2b',
    },
  ]);

  expect(funkyCSV.getCsv()).toBe(
    '"Content Cell 1a","Content Cell 2a"\n"Content Cell 1b","Content Cell 2b"\n'
  );
});

it('should set header before the content', () => {
  const funkyCSV = new FunkyCSV();
  funkyCSV.setContent([{ val: 'Value' }]);
  funkyCSV.setHeader(['Column 1']);
  expect(funkyCSV.getCsv()).toBe('"Column 1"\n"Value"\n');
});

it('should throw an exception if header and content does not match', () => {
  const funkyCSV = new FunkyCSV();
  funkyCSV.setHeader(['Column 1']);
  const error = () =>
    funkyCSV.setContent([{ val1: 'Value 1', val2: 'Value 2' }]);
  expect(error).toThrow();
});

it('should throw an exception if header and content does not match', () => {
  const funkyCSV = new FunkyCSV();
  funkyCSV.setContent([{ val1: 'Value 1', val2: 'Value 2' }]);
  const error = () => funkyCSV.setHeader(['Column 1']);
  expect(error).toThrow();
});

it('should throw an exception if content type is invalid', () => {
  const funkyCSV = new FunkyCSV();
  const error = () => funkyCSV.setContent({ val1: 'Value 1', val2: 'Value 2' });
  expect(error).toThrow();
});

it('should throw an exception if header type is invalid', () => {
  const funkyCSV = new FunkyCSV();
  const error = () => funkyCSV.setHeader('invalid header');
  expect(error).toThrow();
});

it('should duplicate quotes to keep right content', () => {
  const funkyCSV = new FunkyCSV();
  funkyCSV.setHeader(['Column "1"']);
  funkyCSV.setContent([
    {
      ex: 'Value "1"',
    },
  ]);
  expect(funkyCSV.getCsv()).toBe('"Column ""1"""\n"Value ""1"""\n');
});

it('should duplicate closure if it is part of content text', () => {
    const funkyCSV = new FunkyCSV({
        closure: '-'
    });
    funkyCSV.setHeader(['Column -1-']);
    funkyCSV.setContent([
      {
        ex: 'Value -1-',
      },
    ]);
    expect(funkyCSV.getCsv()).toBe('-Column --1---\n-Value --1---\n');
  });