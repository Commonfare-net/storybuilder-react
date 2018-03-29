import { defineMessages, addLocaleData } from 'react-intl';

import en from './en.json';
import enLocaleData from 'react-intl/locale-data/en';
addLocaleData(enLocaleData);

import hr from './hr.json';
import hrLocaleData from 'react-intl/locale-data/hr';
addLocaleData(hrLocaleData);

import it from './it.json';
import itLocaleData from 'react-intl/locale-data/it';
addLocaleData(itLocaleData);

import nl from './nl.json';
import nlLocaleData from 'react-intl/locale-data/nl';
addLocaleData(nlLocaleData);

export default {
  en,
  hr,
  it,
  nl,
};
