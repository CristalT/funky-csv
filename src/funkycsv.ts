type Options = {
  delimiter: string;
  filename: string;
  closure: string;
};

export default class FunkyCSV {
  private header: string = '';
  private content: string = '';
  private options: Options = {
    delimiter: ',',
    filename: 'output.csv',
    closure: '"',
  };

  public constructor(options: Options) {
    Object.assign(this.options, options);
  }

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
    const closure = this.options.closure
    columnNames.forEach((column) => {
      this.header += `${closure}${String(column)
        .trim()
        .replace(new RegExp(closure, 'g'), closure + closure)}${closure}${
        this.options.delimiter
      }`;
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

      const closure = this.options.closure
      cells.forEach((cell) => {
        this.content += `${closure}${String(cell)
          .trim()
          .replace(new RegExp(closure, 'g'), closure + closure)}${closure}${
          this.options.delimiter
        }`;
      });
      this.content = this.content.slice(0, -1);
      this.content += '\n';
    });
  }

  public getCsv(): string {
    return this.header + this.content;
  }

  protected parseFilename(filename?: string): string {
    let _filename = filename ?? this.options.filename;

    if (!_filename.endsWith('.csv')) {
      _filename += '.csv';
    }
    return _filename;
  }
}
