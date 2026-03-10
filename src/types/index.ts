export enum Languages {
  cz = 'cz',
  en = 'en',
  fr = 'fr',
  it = 'it',
  ja = 'ja',
  ko = 'ko',
  pt = 'pt',
  zh = 'zh',
  es = 'es',
}

export type Currency = {
  decimals: boolean;
  label: string;
  value: string;
};

export enum StorageKeys {
  CURRENCY = 'CURRENCY',
  LANGUAGE = 'LANGUAGE',
}
