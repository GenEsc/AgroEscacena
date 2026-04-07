import es from './es.json'

const locales = { es }
const defaultLocale = 'es'

export function t(key, locale = defaultLocale) {
  const keys = key.split('.')
  let value = locales[locale]
  for (const k of keys) {
    if (value == null) return key
    value = value[k]
  }
  return typeof value === 'string' ? value : key
}
