import FunkyCSVWriter from '../writer';
import { writeFile } from 'fs';

export default class NodeWriter extends FunkyCSVWriter {
  public async write(filename?: string): Promise<void> {
    if (typeof process === 'undefined' && Object.prototype.toString.call(process) !== '[object process]') {
      throw new Error('Write method is not available in current environment.');
    }

    return new Promise((resolve, reject) => {
      writeFile(
        this.parseFilename(filename),
        this.getCsv(),
        (error) => {
          if (error) {
            return reject(error);
          }
          resolve();
        }
      );
    });
  }
}