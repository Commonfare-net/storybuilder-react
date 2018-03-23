// translationRunner.js
const manageTranslations = require('react-intl-translations-manager').default;

manageTranslations({
  messagesDirectory: 'src/translations/extractedMessages',
  translationsDirectory: 'src/translations/',
  languages: ['en', 'it', 'nl', 'hr'], // any language you need
});
