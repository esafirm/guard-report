let data = 'EMPTY';
let dataKeys: string[] = [];

export function getData() {
  if (data === 'EMPTY') {
    data = require('./data.json');
  }
  return data;
}

export function getDataKeys() {
  if (dataKeys.length === 0) {
    dataKeys = Object.keys(getData());
  }
  return dataKeys;
}
