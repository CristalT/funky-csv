import FunkyCSVReader from '../reader';

export default class BrowserReader extends FunkyCSVReader {
  public parse(csv: string) {
    return this.getContent(csv);
  }
}