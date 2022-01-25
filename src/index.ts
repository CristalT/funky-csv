import * as fs from 'fs';

type Options = {
  delimiter: string;
  filename: string;
};

export default class FunkyCSV {
  csv: string = '';

  public constructor(
    private readonly options: Options = {
      delimiter: ',',
      filename: 'output.csv',
    }
  ) {}

  public getOptions(): Options {
    return this.options;
  }

  public setHeader(columnNames: string[]): void {
    columnNames.forEach((column) => {
      this.csv += `"${column}"${this.options.delimiter}`;
    });
    this.csv += '\n';
  }

  public setContent(data: any[]): void {
    data.forEach((row) => {
      Object.values(row).forEach((cell) => {
        this.csv += `"${cell}"${this.options.delimiter}`;
      });
      this.csv += '\n';
    });
  }

  public getCsv(): string {
    return this.csv;
  }

  public async write(filename?: string): Promise<void> {
    let _filename = filename ?? this.options.filename;

    if (_filename.indexOf('.csv') === -1) {
      _filename += '.csv';
    }

    return new Promise((resolve, reject) => {
      fs.writeFile(_filename, this.csv, (error: any) => {
        if (error) {
          return reject(error);
        }
        resolve();
      });
    });
  }
}
