import { isNumeric, removeClosures, toCamelCase } from './helpers';

interface ReadOptions {
  delimiter: ',';
  closure: '"';
  rowDelimiter: string;
  headerRow: number;
  parseNumbers: boolean;
}

type RowObject = {
  [K in string]: string | number;
};

export default class FunkyCSVReader {
  public options: ReadOptions = {
    delimiter: ',',
    closure: '"',
    rowDelimiter: '\n',
    headerRow: 0,
    parseNumbers: false,
  };

  public constructor(options: ReadOptions) {
    if (options) {
      Object.assign(this.options, options);
    }
  }

  private getRows(csv: string): string[] {
    return csv.split(this.options.rowDelimiter);
  }

  private getHeader(csv: string): string[] {
    if (this.options.headerRow > -1) {
      return this.getRows(csv)
        [this.options.headerRow].split(this.options.delimiter)
        .map((f) => removeClosures(f, this.options.closure));
    }
    return [];
  }

  public getContent(csv: string): RowObject[] {
    const headerValues = this.getHeader(csv);
    const allRows = this.getRows(csv);
    const results: RowObject[] = [];
    allRows.forEach((row, index) => {
      if (index > this.options.headerRow) {
        const fields = row.split(`${this.options.closure}${this.options.delimiter}${this.options.closure}`);
        const obj: RowObject = {};
        fields.forEach((field, index) => {
          const f = removeClosures(field, this.options.closure);
          if (f) {
            obj[toCamelCase(headerValues[index])] = !isNumeric(f) && this.options.parseNumbers ? Number(f) : String(f);
          }
        });
        if (Object.values(obj).length) {
          results.push(obj);
        }
      }
    });
    return results;
  }
}
