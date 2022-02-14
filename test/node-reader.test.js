/* eslint-disable no-undef */
import FunkyCSVReader from '../src/node-reader';
import fs from 'fs';
import { normalizeExtension } from '../src/helpers';

jest.mock('fs', () => ({
  readFile: jest
    .fn()
    .mockImplementation((file, cb) => cb(null, Buffer.from('"col1","col2"\n"field1","123"\n', 'utf-8'))),
}));

describe('node reader tests', () => {
  it('should get csv content as object array', async () => {
    const funkyCSV = new FunkyCSVReader();
    await expect(funkyCSV.read('filename.csv')).resolves.toStrictEqual([{ col1: 'field1', col2: '123' }]);
  });

  it('should read file adding extension to path', async () => {
    const funkyCSV = new FunkyCSVReader();
    await funkyCSV.read('path/to/filename');
    expect(fs.readFile).toHaveBeenCalledWith(normalizeExtension('path/to/filename'), expect.any(Function));
  });
});
