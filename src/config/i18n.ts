import { initReactI18next } from 'react-i18next'
import NextI18Next from 'next-i18next'

const NextI18NextInstance = new NextI18Next({
  defaultLanguage: 'en',
  otherLanguages: ['fr'],
  fallbackLng: 'en',
  lowerCaseLng: true,
  debug: false,
  browserLanguageDetection: false,
  use: [initReactI18next],
  localeSubpaths: {
    fr: 'fr',
    en: 'en',
  },
})

export default NextI18NextInstance

export const { appWithTranslation, withTranslation, i18n } = NextI18NextInstance
