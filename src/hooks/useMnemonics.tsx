import { useCallback, useEffect, useState } from 'react';
import { generateMnemonic } from '@scure/bip39';
import { wordlist as cz } from '@scure/bip39/wordlists/czech.js';
import { wordlist as en } from '@scure/bip39/wordlists/english.js';
import { wordlist as fr } from '@scure/bip39/wordlists/french.js';
import { wordlist as it } from '@scure/bip39/wordlists/italian.js';
import { wordlist as ja } from '@scure/bip39/wordlists/japanese.js';
import { wordlist as ko } from '@scure/bip39/wordlists/korean.js';
import { wordlist as pt } from '@scure/bip39/wordlists/portuguese.js';
import { wordlist as zh } from '@scure/bip39/wordlists/simplified-chinese.js';
import { wordlist as es } from '@scure/bip39/wordlists/spanish.js';

import { Languages } from '../types';

type useMnemonicsHook = (
  lang?: Languages,
  strength?: 128 | 256,
) => { mnemonic: string; generate: () => void };

export const useMnemonics: useMnemonicsHook = (
  lang = Languages.en,
  strength = 128,
) => {
  const [mnemonic, setMnemonic] = useState<string>('');

  const generate = useCallback(async () => {
    let wordList;

    switch (lang) {
      case Languages.en:
        wordList = en;
        break;
      case Languages.cz:
        wordList = cz;
        break;
      case Languages.fr:
        wordList = fr;
        break;
      case Languages.it:
        wordList = it;
        break;
      case Languages.ja:
        wordList = ja;
        break;
      case Languages.ko:
        wordList = ko;
        break;
      case Languages.pt:
        wordList = pt;
        break;
      case Languages.zh:
        wordList = zh;
        break;
      case Languages.es:
        wordList = es;
        break;
      default:
        wordList = en;
        break;
    }

    const words = generateMnemonic(wordList, strength);
    setMnemonic(words);
  }, [lang, strength]);

  useEffect(() => {
    generate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { mnemonic, generate };
};
