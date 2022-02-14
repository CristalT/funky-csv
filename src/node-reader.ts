import FunkyCSVReader, { RowObject } from './reader';
import fs from 'fs';
import { normalizeExtension } from './helpers';

export default class NodeReader extends FunkyCSVReader {
  public read(filename: string): Promise<RowObject[]> {
    return new Promise((resolve, reject) => {
      fs.readFile(normalizeExtension(filename), (error, data) => {
        if (error) {
          reject(error);
        }
        resolve(this.getContent(data.toString()));
      });
    });
  }
}
