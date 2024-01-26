import fs from 'fs';
import { readFile, utils, writeFile } from 'xlsx';
import set from 'lodash/set';
import process from 'process';
import baseTranslation from '../locales/en';

const supportedLanguages = {
  English: 'en.ts',
  Spanish: 'es.ts',
  'Portuguese - Brazilian': 'pg-bz.ts',
  French: 'fr.ts',
  'Simplified Chinese(zh-CN)': 'zh-cn.ts',
  'Traditional Chinese(zh-HK)': 'zh-hk.ts',
  German: 'de.ts',
  'Portuguese - European': 'pg-eu.ts',
  Italian: 'it.es',
  Korean: 'kr.es',
  Japanese: 'jp.es',
  Dutch: 'de.es',
  Russian: 'ru.es',
  Turkish: 'tr.es',
  Polish: 'po.es',
};

const columnHeaders = ['key', ...Object.keys(supportedLanguages)];

const init = (format: string) => {
  if (format === 'xlsx') {
    const translations = baseTranslation;
    convertToXLSX(translations);
  }

  if (format === 'json') {
    // read the xlsx file and get the worksheet
    const workbook = readFile('./generated_translations.xlsx');
    const worksheet = workbook.Sheets['UI']; //always use the first sheet
    convertToJSON(worksheet);
  }
};

const convertToJSON = (worksheet: any) => {
  const jsa = utils.sheet_to_json(worksheet, { raw: true }) as any;
  let updatedLanguages = Object.keys(jsa[0]);
  const fileNameMapping: { [key: string]: any } = supportedLanguages;
  const filteredLanguages = updatedLanguages.filter((key) =>
    fileNameMapping.hasOwnProperty(key)
  );

  filteredLanguages.forEach((language: string) => {
    const constructedJSON: any[] = [];
    jsa.forEach((row: any) => {
      constructedJSON.push({ [row.key]: row[`${language}`] });
    });
    if (constructedJSON.length > 0) {
      const stringify = JSON.stringify(
        unflattenObject(constructedJSON),
        (key, value) => {
          if (
            typeof value === 'string' &&
            value.startsWith('(') &&
            value.endsWith('`')
          ) {
            return value.replace(/\((\w+)\)/, '($1: number)');
          }
          return value;
        },
        2
      );
      const parseFunctions = stringify.replace(/"([^"]*`[^"]*)"/g, '$1'); //just so we can keep the functions
      fs.writeFileSync(
        `locales/${fileNameMapping[language]}`,
        `export default ${parseFunctions}`
      );
    }
  });
};

const convertToXLSX = (translations: any) => {
  let baseColumns = [columnHeaders];
  const flatObj = flattenObject(translations);
  const translationRows = Object.keys(flatObj);
  const translationColumnValues = Object.values(flatObj) as any;

  translationRows.forEach((row, index) => {
    baseColumns.push([row, translationColumnValues[index].toString()]);
  });

  const workbook = utils.book_new();
  const worksheet = utils.aoa_to_sheet(baseColumns);

  utils.book_append_sheet(workbook, worksheet, 'UI');
  writeFile(workbook, `generated_translations.xlsx`);
};

const flattenObject = (
  obj: object,
  parentProperty?: string,
  propertyMap: Record<string, unknown> = {}
) => {
  for (const [key, value] of Object.entries(obj)) {
    const property = parentProperty ? `${parentProperty}${'.'}${key}` : key;
    if (value && typeof value === 'object') {
      flattenObject(value, property, propertyMap);
    } else {
      propertyMap[property] = value;
    }
  }
  return propertyMap;
};

const unflattenObject = (array: any[]) => {
  return array.reduce((result, item) => {
    Object.entries(item).forEach(([key, value]) => {
      set(result, key, value);
    });
    return result;
  }, {});
};

const fileType = process.argv.slice(2)[0].split('=')[1];
init(fileType);
