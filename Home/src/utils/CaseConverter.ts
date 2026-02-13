// snake_case → camelCase (문자열)
export const snakeToCamel = (str: string): string =>
  str.replace(/_([a-z])/g, (_, char) => char.toUpperCase());

// camelCase → snake_case (문자열)
export const camelToSnake = (str: string): string =>
  str.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`);

// 객체 키 변환 (재귀)
const convertKeys = (
  input: any,
  converter: (key: string) => string
): any => {
  if (Array.isArray(input)) {
    return input.map(item => convertKeys(item, converter));
  }

  if (input !== null && typeof input === 'object') {
    return Object.keys(input).reduce((acc: any, key) => {
      const convertedKey = converter(key);
      acc[convertedKey] = convertKeys(input[key], converter);
      return acc;
    }, {});
  }

  return input;
};

// snake_case → camelCase (객체/배열)
export const snakeToCamelObject = <T = any>(data: any): T =>
  convertKeys(data, snakeToCamel);

// camelCase → snake_case (객체/배열)
export const camelToSnakeObject = <T = any>(data: any): T =>
  convertKeys(data, camelToSnake);
