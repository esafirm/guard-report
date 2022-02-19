/**
 * Don't directly use this except for storing value
 */
let data: RawJson = {};
let dataArray: JsonItem[] = [];
let processedJson: ProcessedJson = {};
let availableTags: string[] = [];
export interface JsonItem {
  parent: string;
  tags: string[];
  children: string[];
}

interface RawJson {
  [key: string]: {
    tags: string[];
    children: string[];
  };
}
interface ProcessedJson {
  [packageName: string]: JsonItem[];
}

export function getData(): RawJson {
  if (Object.keys(data).length == 0) {
    data = require('./data.json') as RawJson;
  }
  return data;
}

export function getDataArray(): JsonItem[] {
  if (dataArray.length === 0) {
    const data = getData();
    const keys = Object.keys(getData());

    dataArray = keys.map((k) => ({
      parent: k,
      ...data[k],
    }));
  }

  return dataArray;
}

function getPackageName(parent: string) {
  const className = parent.substring(parent.lastIndexOf('.'));
  const processed = parent.replace('com.gojek.', '').replace(className, '');

  const firstDot = processed.indexOf('.');
  // This means it only three or 4 level package
  // Ex: com.example.processor.ProcessorInterface
  if (firstDot == -1) {
    return processed;
  }

  const secondDot = processed.indexOf('.', firstDot + 1);
  let packageName = processed.substring(0, secondDot);

  // This means it has 5 level package
  if (!packageName) {
    return processed;
  }

  return packageName;
}

export function getPackageArray(): ProcessedJson {
  if (Object.keys(processedJson).length == 0) {
    const dataArray = getDataArray();
    const result: ProcessedJson = {};

    dataArray.forEach((item) => {
      const parent = item.parent;
      const packageName = getPackageName(parent);

      const key = `com.gojek.${packageName}`;
      let array = result[key];
      if (!array) {
        array = [];
        result[key] = array;
      }

      array.push(item);
    });

    processedJson = result;
  }

  return processedJson;
}

export function getAvailableTags(): string[] {
  if (availableTags.length == 0) {
    const data = getPackageArray();
    const tags = Object.values(data)
      .flatMap((i) => i)
      .flatMap((i) => i.tags);

    // distinct
    availableTags = Array.from(new Set(tags)).sort();
  }
  return availableTags;
}
