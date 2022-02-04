type Options = {
  delimiter: string;
  filename: string;
};

export default class FunkyCSV {
  private header: string = '';
  private content: string = '';

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
    if (!Array.isArray(columnNames)) {
      throw new Error(
        'Error trying to set the CSV Header. The column names must be an array'
      );
    }

    if (
      this.content &&
      this.content.split('\n')[0].split(this.options.delimiter).length !==
        columnNames.length
    ) {
      throw new Error(
        'Error trying to set the CSV Header. The content cells quantity does not match with header columns.'
      );
    }

    this.header = '';
    columnNames.forEach((column) => {
      this.header += `"${String(column).trim()}"${this.options.delimiter}`;
    });
    this.header = this.header.slice(0, -1) + '\n';
  }

  public setContent(data: any[]): void {
    if (
      !Array.isArray(data) ||
      !data.every(
        (item) => item && typeof item === 'object' && !Array.isArray(item)
      )
    ) {
      throw new Error(
        'Error trying to set the CSV Content. The content must be an objects array'
      );
    }

    data.forEach((row) => {
      const cells = Object.values(row);

      if (
        this.header &&
        this.header.split(this.options.delimiter).length !== cells.length
      ) {
        throw new Error(
          'Error trying to set the CSV Content. The header does not match with the content cells quantity.'
        );
      }

      cells.forEach((cell) => {
        this.content += `"${String(cell).trim()}"${this.options.delimiter}`;
      });
      this.content = this.content.slice(0, -1);
      this.content += '\n';
    });
  }

  public getCsv(): string {
    return this.header + this.content;
  }

  private parseFilename(filename?: string): string {
    let _filename = filename ?? this.options.filename;

    if (!_filename.endsWith('.csv')) {
      _filename += '.csv';
    }
    return _filename;
  }

  public async write(filename?: string): Promise<void> {
    if (!process) {
      throw new Error('Write method is not available in current environment.');
    }

    return new Promise((resolve, reject) => {
      const fs = require('fs');
      fs.writeFile(
        this.parseFilename(filename),
        this.getCsv(),
        (error: any) => {
          if (error) {
            return reject(error);
          }
          resolve();
        }
      );
    });
  }

  public download(filename: string): Promise<void> {
    if (!document) {
      throw new Error(
        'Download method is not available in current environment.'
      );
    }

    return new Promise((resolve, reject) => {
      try {
        const link = document.createElement('a');
        link.setAttribute(
          'href',
          `data:text/csv;charset=utf-8,${this.getCsv()}`
        );
        link.setAttribute('download', this.parseFilename(filename));
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        resolve();
      } catch (error) {
        reject(error);
      }
    });
  }
}
