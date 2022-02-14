import { isNumeric, removeClosures, toCamelCase } from './helpers';

interface ReadOptions {
  delimiter: ',';
  closure: '"';
  newLine: string;
  headerRow: number;
  parseNumbers: boolean;
}

export type RowObject = {
  [K in string]: string | number;
};

export default class FunkyCSVReader {
  public options: ReadOptions = {
    delimiter: ',',
    closure: '"',
    newLine: '\n',
    headerRow: 0,
    parseNumbers: false,
  };

  public constructor(options: ReadOptions) {
    if (options) {
      Object.assign(this.options, options);
    }
  }

  private getRows(csv: string): string[] {
    const rows = csv.split(this.options.newLine).filter((row) => row);
    if (!rows.length) throw new Error("Couldn't get rows of provided CSV content");
    return rows;
  }

  private getHeader(csv: string): string[] {
    if (this.options.headerRow > -1) {
      return this.getRows(csv)
        [this.options.headerRow].split(this.options.delimiter)
        .map((f) => removeClosures(f, this.options.closure));
    }
    return [];
  }

  private getContentWithHeaderValues(csv: string): RowObject[] {
    const headerValues = this.getHeader(csv);
    const allRows = this.getRows(csv);
    const results: RowObject[] = [];
    allRows.forEach((row, index) => {
      if (index > this.options.headerRow) {
        const fields = row.split(`${this.options.closure}${this.options.delimiter}${this.options.closure}`);
        if (fields.length !== headerValues.length) throw new Error("Header columns doesn't match with row fields");
        const obj: RowObject = {};
        fields.forEach((field, index) => {
          const f = removeClosures(field, this.options.closure);
          if (f) {
            obj[toCamelCase(headerValues[index])] = isNumeric(f) && this.options.parseNumbers ? Number(f) : String(f);
          }
        });
        if (Object.values(obj).length) {
          results.push(obj);
        }
      }
    });
    return results;
  }

  private getContentWithoutHeaderValues(csv: string): string[][] {
    const results: string[][] = [];
    this.getRows(csv).forEach((row) => {
      const fields = row.split(`${this.options.closure}${this.options.delimiter}${this.options.closure}`);
      const sanitizedFields = fields.map(f => removeClosures(f, this.options.closure));
      results.push(sanitizedFields);
    })
    return results;
  }

  public getContent(csv: string): RowObject[] | string[][] {
    if (this.options.headerRow !== -1) {
      return this.getContentWithHeaderValues(csv);
    }
    return this.getContentWithoutHeaderValues(csv);
  }
}
