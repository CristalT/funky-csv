import FunkyCSV from '../src';
import * as fs from 'fs';

jest.mock('fs', () => ({
  writeFile: jest.fn().mockImplementation((f, d, callback) => {
    callback();
  }),
}));

it('should initialize with default options', () => {
  const funkyCSV = new FunkyCSV();
  const options = funkyCSV.getOptions();
  expect(options).toStrictEqual({
    filename: 'output.csv',
    delimiter: ',',
  });
});

it('should initialize with custom options', () => {
  const funkyCSV = new FunkyCSV({
    filename: 'custom.csv',
    delimiter: ';',
  });
  const options = funkyCSV.getOptions();
  expect(options).toStrictEqual({
    filename: 'custom.csv',
    delimiter: ';',
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

it('should write csv', async () => {
  const funkyCSV = new FunkyCSV();
  funkyCSV.setHeader(['Column 1', 'Column 2']);
  funkyCSV.setContent([
    {
      val1: 'Value Column 1',
      val2: 'Value Column 2',
    },
  ]);

  const csv = funkyCSV.getCsv();

  await funkyCSV.write();
  expect(fs.writeFile).toHaveBeenCalledWith(
    'output.csv',
    csv,
    expect.anything()
  );
});

it('should write csv with custom filename passed within write method', async () => {
  const funkyCSV = new FunkyCSV();
  funkyCSV.setHeader(['Column 1', 'Column 2']);
  funkyCSV.setContent([
    {
      val1: 'Value Column 1',
      val2: 'Value Column 2',
    },
  ]);

  const csv = funkyCSV.getCsv();

  await funkyCSV.write('custom_filename');
  expect(fs.writeFile).toHaveBeenCalledWith(
    'custom_filename.csv',
    csv,
    expect.anything()
  );
});

it('should throw an exception if header and content does not match', () => {
  const funkyCSV = new FunkyCSV();
  funkyCSV.setHeader(['Column 1']);
  const error = () => funkyCSV.setContent([{ val1: 'Value 1', val2: 'Value 2' }]);
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