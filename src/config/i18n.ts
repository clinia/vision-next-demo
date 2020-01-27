import NextI18Next from 'next-i18next'

const NextI18NextInstance = new NextI18Next({
  defaultLanguage: 'en',
  otherLanguages: ['fr'],
  fallbackLng: 'en',
  lowerCaseLng: true,
  debug: false,
  browserLanguageDetection: false,
  localeSubpaths: {
    fr: 'fr',
    en: 'en',
  },
})

export default NextI18NextInstance

export const { appWithTranslation, withTranslation, i18n, Router } = NextI18NextInstance
