import FunkyCSV from './writer';

export default class BrowserWriter extends FunkyCSV {
  public download(filename: string): Promise<void> {
    if (typeof document === 'undefined') {
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
