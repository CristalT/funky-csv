# Funky CSV
## Make CSV files without loosing your coding rhythm

### Getting started
```bash
$ npm i funky-csv
```

### How to use it
**Backend**
```javascript
const FunkyCSV = require('funky-csv/node');

const csv = new FunkyCSV;

csv.setHeader([
    'Column Title 1',
    'Column Title 2',
]);

csv.setContent([
    {
        val1: 'Value column 1 row 1',
        val2: 'Value column 2 row 1',
    },
    {
        val1: 'Value column 1 row 2',
        val2: 'Value column 2 row 2',
    },
]);

csv.write().then(() => console.log('output.csv successfully created!'));
```

**Frontend**
```javascript
import FunkyCSV from 'funky-csv/browser';

const csv = new FunkyCSV;

csv.setHeader(...);
csv.setContent(...);

csv.download().then(() => console.log('output.csv successfully downloaded!'));
```
### Custom options
```javascript
const csv = new FunkyCSV({
    filename: 'custom_filename.csv',
    delimiter: ';',
    closure: '"',
});
```

| Option                   | Type      | Default     | Description                                 |
|--------------------------|-----------|-------------|---------------------------------------------|
| filename                 | string    | output.csv  | Output file name                            |
| delimiter                | string    | ,           | Column delimiter                            |
| closure                  | string    | "           | Closure character for string delimiter      |

### Set filename on `write` & `download` method

```javascript
const csv = new FunkyCSV;
csv.setContent(data);

// in nodejs
csv.write('custom_filename.csv');

// in browser
csv.download('custom_filename.csv');
```
> You can omit `.csv` extension, *Funky CSV* will automatically add it.

## Extra methods
`getOptions()` Returns current options

`getCsv()` Returns CSV string
