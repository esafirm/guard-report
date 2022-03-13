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
  if (Object.keys(data).length === 0) {
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

/**
 * Return package name from a canonical class name
 * The constraint of a package is the class have 4 directory depth
 *
 * For example:
 *
 * com.example.ClassHelper => com.example
 * com.example.utils.ClassUtils => com.example.utils
 * com.example.utils.parser.TestParser => com.example.utils.parser
 * com.example.utils.parser.impl => com.example.utils.parser
 *
 * @param parent - canonical class name
 * @returns package name
 */
function getPackageName(parent: string): string {
  const parts = parent.split('.');
  const partsLength = parts.length;
  let sliceIndex = Math.min(partsLength - 1, 3);
  return parts.slice(0, sliceIndex).join('.');
}

export function getPackageArray(): ProcessedJson {
  if (Object.keys(processedJson).length === 0) {
    const dataArray = getDataArray();
    const result: ProcessedJson = {};

    dataArray.forEach((item) => {
      const parent = item.parent;
      const packageName = getPackageName(parent);

      const key = packageName;
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

export const NO_TAG = 'No Tag';

export function getAvailableTags(): string[] {
  if (availableTags.length === 0) {
    const data = getPackageArray();
    const tags = Object.values(data)
      .flatMap((i) => i)
      .flatMap((i) => i.tags);

    // distinct
    availableTags = [NO_TAG, ...Array.from(new Set(tags)).sort()];
  }
  return availableTags;
}
