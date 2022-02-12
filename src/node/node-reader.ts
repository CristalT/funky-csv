import FunkyCSVReader from '../reader';
import { readFileSync } from 'fs';
import { normalizeExtension } from '../helpers';

export default class NodeReader extends FunkyCSVReader {
  public read(filename?: string) {
    const _filename = filename ?? this.options.filename;
    const csv = readFileSync(normalizeExtension(_filename)).toString();
    return this.getContent(csv);
  }
}