import fs from 'fs';
import { readFile, utils, writeFile, WorkSheet } from 'xlsx';
import set from 'lodash/set';
import process from 'process';
import baseTranslation from '../locales/en';
import existingTranslations from '../locales';

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

const GENERATED_XLSX = 'generated_translations.xlsx';

const init = (format: string) => {
  if (format === 'xlsx') {
    const translations = baseTranslation;
    convertToXLSX(translations);
  }

  if (format === 'json') {
    // read the xlsx file and get the worksheet
    const workbook = readFile(`./${GENERATED_XLSX}`);
    const worksheet = workbook.Sheets['UI']; //always use the first sheet
    convertToJSON(worksheet);
  }
};

const convertToJSON = (worksheet: WorkSheet) => {
  const jsa = utils.sheet_to_json(worksheet, { raw: true }) as string[];
  let updatedLanguages = Object.keys(jsa[0]);
  const fileNameMapping: { [key: string]: any } = supportedLanguages;
  const filteredLanguages = updatedLanguages.filter((key) =>
    fileNameMapping.hasOwnProperty(key)
  );

  filteredLanguages
    .map((language: string) => {
      const constructedJSON: { [key: string]: [key: string] }[] = jsa.map(
        (row: any) => ({
          [row.key]: row[language],
        })
      );
      return { language, constructedJSON };
    })
    .filter(({ constructedJSON }) => constructedJSON.length > 0)
    .forEach(({ language, constructedJSON }) => {
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
      const parseFunctions = stringify.replace(/"([^"]*`[^"]*)"/g, '$1');

      const outputFileName = `locales/${fileNameMapping[language]}`;
      fs.writeFileSync(outputFileName, `export default ${parseFunctions}`);
    });
};

const convertToXLSX = (translations: any) => {
  let baseColumns = [columnHeaders];
  const flatObj = flattenObject(translations);
  const baseTranslationRows = Object.keys(flatObj);
  const baseTranslationColumnValues = Object.values(flatObj) as string[]; // base translation column values
  const existingTranslationColumnValues: string[][] = [];
  existingTranslations.forEach((language) => {
    const flatten = flattenObject(language);
    existingTranslationColumnValues.push(Object.values(flatten));
  });

  baseTranslationRows.forEach((row, index) => {
    const currentRow = [row, baseTranslationColumnValues[index].toString()];
    existingTranslationColumnValues.forEach((_element: any, key: any) => {
      currentRow.push(existingTranslationColumnValues[key][index]);
    });
    baseColumns.push(currentRow);
  });

  const workbook = utils.book_new();
  const worksheet = utils.aoa_to_sheet(baseColumns);

  utils.book_append_sheet(workbook, worksheet, 'UI');
  writeFile(workbook, `./${GENERATED_XLSX}`);
};

const flattenObject = (
  obj: object,
  parentProperty?: string,
  propertyMap: Record<string, string> = {}
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

const unflattenObject = (array: { [key: string]: [key: string] }[]) => {
  return array.reduce((result, item) => {
    Object.entries(item).forEach(([key, value]) => {
      set(result, key, value);
    });
    return result;
  }, {});
};

const fileType = process.argv.slice(2)[0].split('=')[1];
init(fileType);
