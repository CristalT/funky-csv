export const isNumeric = (str: string): boolean => {
  if (typeof str !== 'string') return false;
  return !isNaN(Number(str)) && !isNaN(parseFloat(str));
};

export const normalizeExtension = (filename: string): string => {
  if (!filename.endsWith('.csv')) {
    filename += '.csv';
  }
  return filename;
};

export const removeClosures = (str: string, closure: string): string => {
  return str.replace(new RegExp(`^${closure}?|${closure}?$`, 'g'), '');
};

export const toCamelCase = (str: string): string => {
  return str.split(' ').reduce((acc, w, index) => {
    if (index === 0) acc += w.toLocaleLowerCase();
    else acc += `${w.charAt(0).toUpperCase()}${w.slice(1)}`;
    return acc;
  }, '');
};
