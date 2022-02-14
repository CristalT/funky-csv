# Funky CSV
## Make & Read CSV files without loosing your coding rhythm

## Installation
```bash
$ npm i funky-csv
```

## Create CSV Files
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

## Read and parse CSV files
**Backend**
```javascript
import FunkyCSVReader from 'funky-csv/node-reader';

const csv = new FunkyCSVReader;
csv.read('path/to/filename.csv').then(console.log) // [{col1: field1, col2: field2}]
```

**Frontend**
```javascript
import FunkyCSVReader from 'funky-csv/browser-reader';

const csv = new FunkyCSVReader;
const csvString = '"col name 1","field1"\n"col name 2","field2"\n'
csv.parse(csvString).then(console.log) // [{colName1: field1, colName2: field2}]
```
> 💡  Column names are automatically converted to `camelCase` style

## Custom options
**Example:**
```javascript
const csv = new FunkyCSV({
    filename: 'custom_filename.csv',
    delimiter: ';',
    closure: '"',
    ...
});
```

| Option                   | Type      | Default     | Writer     | Reader    | Description                                 |
|--------------------------|-----------|-------------|:----------:|:---------:|---------------------------------------------|
| filename                 | string    | output.csv  | ✅         | ❌         | Output file name                            |
| delimiter                | string    | ,           | ✅         | ✅         | Column delimiter                            |
| closure                  | string    | "           | ✅         | ✅         | Closure character for string delimiter      |
| headerRow                | number    | 0           | ❌         | ✅         | Row number of header location (where to start reading)   |
| newLine                  | string    | \n          | ❌         | ✅         | New line ascii character                    |
| parseNumbers             | boolean   | false       | ❌         | ✅         | Parse string numbers to number type         |

# Extras
## Setting filename on `write` & `download` method

```javascript
// nodejs
csv.write('custom_filename');

// browser
csv.download('custom_filename');
```
> 💡 You can omit `.csv` extension, *Funky CSV* will automatically add it.