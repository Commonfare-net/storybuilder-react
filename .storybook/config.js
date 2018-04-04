import { addDecorator, configure } from '@storybook/react';
import { setIntlConfig, withIntl } from 'storybook-addon-intl';

import { addLocaleData } from 'react-intl';
import enLocaleData from 'react-intl/locale-data/en';
import itLocaleData from 'react-intl/locale-data/it';
import hrLocaleData from 'react-intl/locale-data/hr';
import nlLocaleData from 'react-intl/locale-data/nl';
import translations from '../src/translations';

addLocaleData(enLocaleData);
addLocaleData(itLocaleData);
addLocaleData(hrLocaleData);
addLocaleData(nlLocaleData);

const locales = ['en', 'it', 'hr', 'nl'];

setIntlConfig({
  locales,
  defaultLocale: 'en',
  getMessages: locale => translations[locale]
});

addDecorator(withIntl);

// automatically import all files ending in *.stories.js
const req = require.context('../stories', true, /.stories.js$/);
function loadStories() {
  req.keys().forEach((filename) => req(filename));
}

configure(loadStories, module);
