import { FunkyCSVNodeWriter as FunkyCSV } from '../src/node';
import * as fs from 'fs';

jest.mock('fs', () => ({
  writeFile: jest.fn().mockImplementation((f, d, callback) => {
    callback();
  }),
}));

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