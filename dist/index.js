"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
class FunkyCSV {
    constructor(options = {
        delimiter: ',',
        filename: 'output.csv',
    }) {
        this.options = options;
        this.header = '';
        this.content = '';
    }
    getOptions() {
        return this.options;
    }
    setHeader(columnNames) {
        if (!Array.isArray(columnNames)) {
            throw new Error('Error trying to set the CSV Header. The column names must be an array');
        }
        if (this.content &&
            this.content.split('\n')[0].split(this.options.delimiter).length !==
                columnNames.length) {
            throw new Error('Error trying to set the CSV Header. The content cells quantity does not match with header columns.');
        }
        this.header = '';
        columnNames.forEach((column) => {
            this.header += `"${String(column).trim()}"${this.options.delimiter}`;
        });
        this.header = this.header.slice(0, -1) + '\n';
    }
    setContent(data) {
        if (!Array.isArray(data) ||
            !data.every((item) => item && typeof item === 'object' && !Array.isArray(item))) {
            throw new Error('Error trying to set the CSV Content. The content must be an objects array');
        }
        data.forEach((row) => {
            const cells = Object.values(row);
            if (this.header &&
                this.header.split(this.options.delimiter).length !== cells.length) {
                throw new Error('Error trying to set the CSV Content. The header does not match with the content cells quantity.');
            }
            cells.forEach((cell) => {
                this.content += `"${String(cell).trim()}"${this.options.delimiter}`;
            });
            this.content = this.content.slice(0, -1);
            this.content += '\n';
        });
    }
    getCsv() {
        return this.header + this.content;
    }
    parseFilename(filename) {
        let _filename = filename !== null && filename !== void 0 ? filename : this.options.filename;
        if (!_filename.endsWith('.csv')) {
            _filename += '.csv';
        }
        return _filename;
    }
    write(filename) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!process) {
                throw new Error('Write method is not available in current environment.');
            }
            return new Promise((resolve, reject) => {
                const fs = require('fs');
                fs.writeFile(this.parseFilename(filename), this.getCsv(), (error) => {
                    if (error) {
                        return reject(error);
                    }
                    resolve();
                });
            });
        });
    }
    download(filename) {
        if (!document) {
            throw new Error('Download method is not available in current environment.');
        }
        return new Promise((resolve, reject) => {
            try {
                const link = document.createElement('a');
                link.setAttribute('href', `data:text/csv;charset=utf-8,${this.getCsv()}`);
                link.setAttribute('download', this.parseFilename(filename));
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                resolve();
            }
            catch (error) {
                reject(error);
            }
        });
    }
}
exports.default = FunkyCSV;
