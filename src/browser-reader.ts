import FunkyCSVReader, { RowObject } from './reader';

export default class BrowserReader extends FunkyCSVReader {
  public parse(csv: string): Promise<RowObject[] | (string | number)[][]> {
    return new Promise((resolve, reject) => {
      try {
        resolve(this.getContent(csv));
      } catch (error) {
        reject(error);
      }
    });
  }
}
